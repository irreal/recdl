import { Repository, Entity, Schema } from "redis-om";
import { GuessResponse } from "../../services/guess-response.type";
import { getClient } from "../../services/redis.service";

export class Game extends Entity {
  getGuesses(): GuessResponse[] {
    const jsonData = this.guesses;
    if (!jsonData) {
      return [];
    }
    return JSON.parse(this.guesses) as GuessResponse[];
  }

  addGuess(guess: GuessResponse): void {
    const guesses = this.getGuesses();
    guesses.push(guess);
    this.guesses = JSON.stringify(guesses);
  }
}
export interface Game {
  guesses: string;
  word: string;
}
let schema = new Schema(
  Game,
  {
    guesses: { type: "string" },
    word: { type: "string" },
  },
  { dataStructure: "JSON" }
);

export const getRepository = async function (): Promise<Repository<Game>> {
  const client = await getClient();
  return new Repository(schema, client);
};
