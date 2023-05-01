import { GuessResponse } from "../../services/guess-response.type";

export class Game {
  constructor(
    public id: string,
    public word: string,
    public guesses: GuessResponse[]
  ) {}
  getGuesses(): GuessResponse[] {
    return this.guesses;
  }

  addGuess(guess: GuessResponse): void {
    this.guesses.push(guess);
  }
}
