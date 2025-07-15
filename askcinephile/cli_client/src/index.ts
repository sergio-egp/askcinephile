import { input, select, Separator } from "@inquirer/prompts";
import { getFilmInfo } from "./functions/getFilmInfo.function";
import { getActorInfo } from "./functions/getActorInfo.function";

main();

async function main(): Promise<void> {
  try {
    console.log(
      `Information courtesy of\nIMDb\n(https://www.imdb.com).\nUsed with permission.
      \n\n========================\nWelcome to AskCinephile!\n========================\n\n`
    );

    let selectedOption = await firstChoice();

    while (selectedOption != "exit") {
      if (selectedOption == "films") {
        const filmsAnswer: string = await input({
          message: "Enter the original name of the film:",
          required: true,
        });
        const filmInfo: string | undefined = await getFilmInfo(filmsAnswer);

        if (filmInfo) {
          console.log(`\n${filmInfo}\n`);
        }

        selectedOption = await firstChoice();
      } else if (selectedOption == "actors") {
        const actorsAnswer: string = await input({
          message: "Enter the primary name of the actor:",
          required: true,
        });
        const actorInfo: string | undefined = await getActorInfo(actorsAnswer);

        if (actorInfo) {
          console.log(`\n${actorInfo}\n`);
        }

        selectedOption = await firstChoice();
      }
    }

    console.log("\n👋 Until next time!\n");
  } catch (error) {
    if (error instanceof Error && error.name === "ExitPromptError") {
      console.log("\n👋 Until next time!\n");
    } else {
      throw error;
    }
  }
}

async function firstChoice(): Promise<string> {
  return await select({
    message: "What do you want to ask about?\n",
    choices: [
      {
        name: "Films",
        value: "films",
      },
      //   new Separator(),
      {
        name: "Actors",
        value: "actors",
      },
      //   new Separator(),
      {
        name: "Exit (I'm done)",
        value: "exit",
      },
    ],
  });
}
