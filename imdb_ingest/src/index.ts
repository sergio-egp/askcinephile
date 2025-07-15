import axios from "axios";
import { parse } from "csv-parse";
import { pipeline } from "stream";
import { promisify } from "util";
import zlib from "zlib";

const IMDB_FILMS_DATASET_URL =
  "https://datasets.imdbws.com/title.basics.tsv.gz";
const IMDB_PEOPLE_DATASET_URL =
  "https://datasets.imdbws.com/name.basics.tsv.gz";
const BATCH_SIZE = 5000;

const pipelineAsync = promisify(pipeline);

async function main() {
  console.log(
    `Information courtesy of\nIMDb\n(https://www.imdb.com).\nUsed with permission.
      \n\n==============================\n
      AskCinephile Ingestion Process
      \n==============================\n\n`
  );

  console.log("Initializing IMDB ingestion process...");

  console.log("Clearing previous data...");

  console.log("Downloading people dataset...");
  const peopleDatasetResponse = await axios.get(IMDB_PEOPLE_DATASET_URL, {
    responseType: "stream",
  });

  const gunzip = zlib.createGunzip();

  const parser = parse({
    delimiter: "\t",
    columns: true,
    relax_quotes: true,
    relax_column_count: true,
    skip_empty_lines: true,
  });

  let count = 0;
  let batch: {
    nconst: any;
    primaryName: any;
    birthYear: number | null;
    deathYear: number | null;
    primaryProfession: any;
    knownForTitles: any;
  }[] = [];

  parser.on("readable", async () => {
    let record;
    while ((record = parser.read()) != null) {
      const transformed = await transformRecord(record);
      batch.push(transformed);

      if (batch.length >= BATCH_SIZE) {
        await processBatch(batch);
        batch = [];
      }

      count++;
    }
  });

  parser.on("end", async () => {
    if (batch.length > 0) {
      await processBatch(batch);
    }
    console.log(`Ingestion complete. Total records: ${count}`);
  });

  parser.on("error", (error) => {
    console.error("Parser error: ", error);
  });

  await pipelineAsync(peopleDatasetResponse.data, gunzip, parser);

  console.log("Pipeline finished");

  //   console.log("Downloading films dataset...");
  //   const filmsDatasetResponse = await axios.get(IMDB_FILMS_DATASET_URL, {
  //     responseType: "stream",
  //   });

  console.log("Populating database...");
}

async function transformRecord(record: any): Promise<{
  nconst: any;
  primaryName: any;
  birthYear: number | null;
  deathYear: number | null;
  primaryProfession: any;
  knownForTitles: any;
}> {
  return {
    nconst: record.nconst,
    primaryName: record.primaryName,
    birthYear:
      record.birthYear === "\\N" ? null : parseInt(record.birthYear, 10),
    deathYear:
      record.deathYear === "\\N" ? null : parseInt(record.deathYear, 10),
    primaryProfession: record.primaryProfession?.split(",") || [],
    knownForTitles: record.knownForTitles?.split(",") || [],
  };
}

async function processBatch(
  batch: {
    nconst: any;
    primaryName: any;
    birthYear: number | null;
    deathYear: number | null;
    primaryProfession: any;
    knownForTitles: any;
  }[]
): Promise<void> {
  console.log(`Processing batch of size: ${batch.length}`);
}

main().catch((error) => {
  console.error("Error in ingestion: ", error);
  process.exit(1);
});
