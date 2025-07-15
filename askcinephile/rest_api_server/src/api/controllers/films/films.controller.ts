import { NextFunction, Request, Response } from "express";
import { FilmsService } from "../../services/films/films.service";
import { getFilmInfoParams } from "../../schemas/films/getFilmInfo.schemas";

export class FilmsController {
  static async getFilmInfo(
    req: Request<getFilmInfoParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const filmName: string = req.params.filmName;
      const filmInfo: string = await FilmsService.getFilmInfo(filmName);
      console.log("REQUEST", req.params.filmName);

      if (filmInfo) {
        res.status(200).json({ message: filmInfo });
      } else {
        res.status(404).send();
      }
    } catch (error) {
      next(error);
    }
  }
}
