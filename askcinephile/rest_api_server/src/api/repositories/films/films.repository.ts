import { askCinephileDB } from "../../../config/database.config";

export class FilmsRepository {
  static async getFilmInfo(filmName: string): Promise<{
    titleType: string;
    primaryTitle: string;
    originalTitle: string;
    startYear: number;
    genres: string;
  }> {
    try {
      const [query] = await askCinephileDB.query<
        {
          id: number;
          tconst: string;
          titleType: string;
          primaryTitle: string;
          originalTitle: string;
          startYear: number;
          endYear: number;
          runtimeMinutes: number;
          genres: string;
        }[]
      >(
        `
        SELECT id, titleType, primaryTitle, originalTitle, startYear, endYear, runtimeMinutes, genres
        FROM FILMS
        WHERE LOWER(primaryTitle) LIKE LOWER(?) 
        LIMIT 1
        `,
        [filmName]
      );

      return query;
    } catch (error) {
      throw error;
    }
  }
}
