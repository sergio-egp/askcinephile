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
          titleType: string;
          primaryTitle: string;
          originalTitle: string;
          startYear: number;
          genres: string;
        }[]
      >(
        `
        SELECT *
        FROM FILMS
        WHERE LOWER(primaryTitle) LIKE LOWER(?) 
        `,
        [filmName]
      );

      return query;
    } catch (error) {
      throw error;
    }
  }
}
