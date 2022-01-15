import words from "../data/words.json";
import { CharacterMatch } from "./character-match.enum";
import { GuessResponse } from "./guess-response.type";
import { GuessResponseType } from "./response-type.enum";

export class WordService {
  getRandomWord(): string {
    return words[Math.floor(Math.random() * words.length)];
  }

  isWordPresent(word: string) {
    const lowercaseWord = word.toLowerCase();
    return Boolean(words.find((w) => w.toLowerCase() === lowercaseWord));
  }

  getGuessReport(word: string, guess: string): GuessResponse {
    if (!guess || !word) {
      throw new Error("invalid input");
    }
    if (guess.length !== word.length) {
      return {
        type: GuessResponseType.IncorrectGuessLength,
        characterInfo: [],
        guess,
      };
    }
    const guessValidWord = this.isWordPresent(guess);
    if (!guessValidWord) {
      return {
        type: GuessResponseType.GuessNotAValidWord,
        characterInfo: [],
        guess,
      };
    }
    const matches = this.getCharacterMatches(
      word.toLowerCase(),
      guess.toLowerCase()
    );
    return {
      type: this.getResponseTypeFromMatches(matches),
      characterInfo: matches,
      guess,
    };
  }

  getResponseTypeFromMatches(matches: CharacterMatch[]): GuessResponseType {
    if (matches.find((m) => m !== CharacterMatch.Correct)) {
      return GuessResponseType.Incorrect;
    }
    return GuessResponseType.Correct;
  }

  getCharacterMatches(word: string, guess: string): CharacterMatch[] {
    const wordLetters = word.split("");
    const guessLetters = guess.split("");
    const availableLetters = [...wordLetters];
    const characterMatchResult = [];
    for (let i = 0; i < word.length; i++) {
      if (wordLetters[i] === guessLetters[i]) {
        characterMatchResult[i] = CharacterMatch.Correct;
        this.removeFromArray(availableLetters, guessLetters[i]);
        guessLetters[i] = "*";
      }
    }
    if (availableLetters.length === 0) {
      return characterMatchResult;
    }
    for (let i = 0; i < guessLetters.length; i++) {
      if (guessLetters[i] === "*") {
        continue;
      }
      if (availableLetters.includes(guessLetters[i])) {
        characterMatchResult[i] = CharacterMatch.WrongSpot;
        this.removeFromArray(availableLetters, guess[i]);
      } else {
        characterMatchResult[i] = CharacterMatch.Miss;
      }
    }
    return characterMatchResult;
  }

  removeFromArray(array: string[], item: string): void {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
}
