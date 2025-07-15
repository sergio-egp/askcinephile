import fi from "zod/v4/locales/fi.cjs";
import { FilmsRepository } from "../../repositories/films/films.repository";

export class FilmsService {
  static async getFilmInfo(filmName: string): Promise<string> {
    const filmInfo: {
      titleType: string;
      primaryTitle: string;
      originalTitle: string;
      startYear: number;
      genres: string;
    } = await FilmsRepository.getFilmInfo(filmName);

    return `${filmInfo.titleType}: ${filmInfo.primaryTitle}, originally titled ${filmInfo.originalTitle} (${filmInfo.startYear}):\n-Genres: ${filmInfo.genres}`;
  }
}
