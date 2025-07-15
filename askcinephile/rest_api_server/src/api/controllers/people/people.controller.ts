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
      const actorInfo: unknown = await PeopleService.getActorInfo(actorName);

      res.status(200).json({ message: "BRUCE WILLIS" });
    } catch (error) {
      next(error);
    }
  }
}
