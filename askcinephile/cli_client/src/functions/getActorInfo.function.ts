import axios from "axios";

const API_ENDPOINT: string = "http://rest_api_server:3000/api/people";

export async function getActorInfo(
  actorName: string
): Promise<string | undefined> {
  try {
    const response = await axios.get<{ message: string }>(
      `${API_ENDPOINT}/actor/${actorName}`
    );
    return response.data.message;
  } catch (error) {
    console.error(
      `\nCouldn't find info about \"${actorName}\". Service could be unavailable, or perhaps you made a typo?\n`
    );
    return undefined;
  }
}
