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
      const filmInfo: unknown = await FilmsService.getFilmInfo(filmName);

      res.status(200).json({ message: "BRAVEHEART" });
    } catch (error) {
      next(error);
    }
  }
}
