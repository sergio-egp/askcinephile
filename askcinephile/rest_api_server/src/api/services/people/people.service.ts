import { PeopleRepository } from "../../repositories/people/people.repository";

export class PeopleService {
  static async getActorInfo(actorName: string): Promise<unknown> {
    const actorInfo: unknown = await PeopleRepository.getActorInfo();
    return actorInfo;
  }
}
