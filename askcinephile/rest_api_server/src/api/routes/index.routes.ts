import { Router } from "express";
import routerPeople from "./people/people.routes";
import routerFilms from "./films/films.routes";

const routerIndex = Router();

routerIndex.use("/people", routerPeople);

routerIndex.use("/films", routerFilms);

export default routerIndex;
