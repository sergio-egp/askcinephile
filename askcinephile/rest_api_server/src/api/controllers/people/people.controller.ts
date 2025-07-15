import { NextFunction, Request, Response } from "express";
import { PeopleService } from "../../services/people/people.service";
import { getActorInfoParams } from "../../schemas/people/getActorInfo.schemas";

export class PeopleController {
  static async getActorInfo(
    req: Request<getActorInfoParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const actorName: string = req.params.actorName;
      const actorInfo: string = await PeopleService.getActorInfo(actorName);

      if (actorInfo) {
        res.status(200).json({ message: actorInfo });
      } else {
        res.status(404).send();
      }
    } catch (error) {
      next(error);
    }
  }
}
