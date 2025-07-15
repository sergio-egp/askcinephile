import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

export const askCinephileDB = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  connectionLimit: 3,
  acquireTimeout: 10000,
  idleTimeout: 30000,
});
