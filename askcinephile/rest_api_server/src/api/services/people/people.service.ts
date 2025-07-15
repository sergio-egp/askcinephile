import { PeopleRepository } from "../../repositories/people/people.repository";

export class PeopleService {
  static async getActorInfo(actorName: string): Promise<string> {
    const actorInfo: {
      id: number;
      nconst: string;
      primaryName: string;
      birthYear: number;
      deathYear: number;
      primaryProfession: string;
      knownForTitles: string;
    } = await PeopleRepository.getActorInfo(actorName);

    return `${actorInfo.primaryName} (${actorInfo.birthYear} - ${actorInfo.deathYear}):\n-Professions: ${actorInfo.primaryProfession}\n`;
  }
}
