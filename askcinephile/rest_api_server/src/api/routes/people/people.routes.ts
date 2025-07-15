import { Router } from "express";
import { PeopleController } from "../../controllers/people/people.controller";
import { validate } from "../../../middlewares/validation.middleware";
import { getActorInfoSchema } from "../../schemas/people/getActorInfo.schemas";

const routerPeople = Router();

routerPeople.use(
  "/actor/:actorName",
  validate(getActorInfoSchema),
  PeopleController.getActorInfo
);

export default routerPeople;
