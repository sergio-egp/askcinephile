import { Router } from "express";
import { FilmsController } from "../../controllers/films/films.controller";
import { validate } from "../../../middlewares/validation.middleware";
import { getFilmInfoSchema } from "../../schemas/films/getFilmInfo.schemas";

const routerFilms = Router();

routerFilms.use(
  "/info/:filmName",
  validate(getFilmInfoSchema),
  FilmsController.getFilmInfo
);

export default routerFilms;
