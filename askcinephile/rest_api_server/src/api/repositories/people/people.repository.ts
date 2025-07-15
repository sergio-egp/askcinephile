import { askCinephileDB } from "../../../config/database.config";

export class PeopleRepository {
  static async getActorInfo(actorName: string): Promise<{
    id: number;
    nconst: string;
    primaryName: string;
    birthYear: number;
    deathYear: number;
    primaryProfession: string;
    knownForTitles: string;
  }> {
    try {
      const [query] = await askCinephileDB.query<
        {
          id: number;
          nconst: string;
          primaryName: string;
          birthYear: number;
          deathYear: number;
          primaryProfession: string;
          knownForTitles: string;
        }[]
      >(
        `
      SELECT id, nconst, primaryName, birthYear, deathYear, primaryProfession, knownForTitles
      FROM PEOPLE
      WHERE LOWER(primaryName) LIKE LOWER(?) 
      LIMIT 1
      `,
        [actorName]
      );

      return query;
    } catch (error) {
      throw error;
    }
  }
}
