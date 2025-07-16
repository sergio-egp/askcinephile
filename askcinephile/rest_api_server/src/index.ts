import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routerIndex from "./api/routes/index.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/notFound.middleware";

dotenv.config();

const app = express();
const port = process.env.REST_API_PORT;

const allowedDomains: string[] = ["http://localhost"];
const corsOptionsDelegate = function (req: any, callback: any) {
  let corsOptions;
  if (allowedDomains.indexOf(req.header("Origin")) != -1) {
    corsOptions = { origin: true, credentials: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.disable("x-powered-by");

app.use(cors(corsOptionsDelegate));

app.use(express.json());

app.use("/api", routerIndex);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`AskCinephile REST API listening on port ${port}`);
});
