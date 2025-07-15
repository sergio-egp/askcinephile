import axios from "axios";

const API_ENDPOINT: string = "http://rest_api_server:3000/api/films";

export async function getFilmInfo(
  filmName: string
): Promise<string | undefined> {
  try {
    const response = await axios.get<{ message: string }>(
      `${API_ENDPOINT}/info/${filmName}`
    );
    return response.data.message;
  } catch (error) {
    console.error(
      `\nCouldn't find info about \"${filmName}\". Service could be unavailable, or perhaps you made a typo?\n`
    );
    return undefined;
  }
}
