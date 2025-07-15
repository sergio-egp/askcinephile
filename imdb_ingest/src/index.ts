import axios from "axios";
import { exec } from "child_process";
import dotenv from "dotenv";
import fs from "fs";
import mariadb from "mariadb";
import path from "path";
import zlib from "zlib";

dotenv.config();

process.env.DEBUG = "mariadb";

const IMDB_FILMS_DATASET_URL =
  "https://datasets.imdbws.com/title.basics.tsv.gz";
const IMDB_PEOPLE_DATASET_URL =
  "https://datasets.imdbws.com/name.basics.tsv.gz";
const DATA_DIR = path.join(process.cwd(), "temp/data");
const PEOPLE_OUTPUT_FILE = path.join(DATA_DIR, "name.basics.tsv");
const FILMS_OUTPUT_FILE = path.join(DATA_DIR, "title.basics.tsv");

async function main() {
  console.log(
    `Information courtesy of\nIMDb\n(https://www.imdb.com).\nUsed with permission.
    \n\n==============================\nAskCinephile Ingestion Process\n==============================\n\n`
  );

  console.log("Initializing IMDB ingestion process...");

  console.log("Downloading datasets...");

  const peopleDatasetResponse = await axios.get(IMDB_PEOPLE_DATASET_URL, {
    responseType: "stream",
  });

  console.log("Downloading films dataset...");
  const filmsDatasetResponse = await axios.get(IMDB_FILMS_DATASET_URL, {
    responseType: "stream",
  });

  await Promise.all([peopleDatasetResponse, filmsDatasetResponse]);

  await fs.promises.mkdir(DATA_DIR, { recursive: true });

  console.log("Decompressing and writing to disk...");

  const peopleOutStream = fs.createWriteStream(PEOPLE_OUTPUT_FILE);
  const filmsOutStream = fs.createWriteStream(FILMS_OUTPUT_FILE);

  const peoplePromise = await new Promise<void>((resolve, reject) => {
    peopleDatasetResponse.data
      .pipe(zlib.createGunzip())
      .pipe(peopleOutStream)
      .on("finish", resolve)
      .on("error", reject);
  });
  const filmsPromise = await new Promise<void>((resolve, reject) => {
    filmsDatasetResponse.data
      .pipe(zlib.createGunzip())
      .pipe(filmsOutStream)
      .on("finish", resolve)
      .on("error", reject);
  });

  await Promise.all([peoplePromise, filmsPromise]);

  const connection = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    connectionLimit: 3,
  });

  console.log("Clearing previous data...");
  await connection.query("TRUNCATE TABLE PEOPLE");
  await connection.query("TRUNCATE TABLE FILMS");

  console.log("Populating database...");
  const peopleCmd = `mysql --local-infile=1 -h ${process.env.DB_HOST} -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} ${process.env.DB_DATABASE} -e "LOAD DATA LOCAL INFILE '${PEOPLE_OUTPUT_FILE}' INTO TABLE PEOPLE FIELDS TERMINATED BY '\\t' LINES TERMINATED BY '\\n' IGNORE 1 LINES (nconst, primaryName, birthYear, deathYear, primaryProfession, knownForTitles)"`;
  const filmsCmd = `mysql --local-infile=1 -h ${process.env.DB_HOST} -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} ${process.env.DB_DATABASE} -e "LOAD DATA LOCAL INFILE '${FILMS_OUTPUT_FILE}' INTO TABLE FILMS FIELDS TERMINATED BY '\\t' LINES TERMINATED BY '\\n' IGNORE 1 LINES (tconst, titleType, primaryTitle, originalTitle, isAdult, startYear, endYear, runtimeMinutes, genres)"`;

  const peopleCmcPromise = await new Promise<void>((resolve, reject) => {
    exec(peopleCmd, (error, stdout, stderr) => {
      if (error) {
        console.error("People cmd Error:", error, stderr);
        reject(error);
      } else {
        console.log(`Ingestion of people data complete`, stdout);
        resolve();
      }
    });
  });

  const filmsCmcPromise = await new Promise<void>((resolve, reject) => {
    exec(filmsCmd, (error, stdout, stderr) => {
      if (error) {
        console.error("Films cmd Error:", error, stderr);
        reject(error);
      } else {
        console.log(`Ingestion of films data complete`, stdout);
        resolve();
      }
    });
  });

  await Promise.all([peopleCmcPromise, filmsCmcPromise]);
}

main().catch((error) => {
  console.error("Error in ingestion: ", error);
  process.exit(1);
});
