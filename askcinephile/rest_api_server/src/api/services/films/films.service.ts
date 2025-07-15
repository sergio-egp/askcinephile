import { FilmsRepository } from "../../repositories/films/films.repository";

export class FilmsService {
  static async getFilmInfo(filmName: string): Promise<unknown> {
    const filmInfo: unknown = await FilmsRepository.getFilmInfo();
    return filmInfo;
  }
}
