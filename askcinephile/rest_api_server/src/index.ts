import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
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

// app.use(helmet({ strictTransportSecurity: false }));

app.disable("x-powered-by");

app.use(cors(corsOptionsDelegate));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(
    `IP: ${req.ip} \n remoteAdress: ${req.socket.remoteAddress} \n remotePort: ${req.socket.remotePort}`
  );
});

app.use("/api", routerIndex);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`AskCinephile REST API listening on port ${port}`);
});
