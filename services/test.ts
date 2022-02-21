import { CharacterMatch } from "./character-match.enum";
import { GuessResponse } from "./guess-response.type";
import { WordService } from "./word.service";

const getHint = (word: string, guesses: GuessResponse[]): string => {
  let letters = word.split("").map((l, idx) => ({ letter: l, index: idx }));
  const hint: string[] = new Array(word.length).fill("?");
  guesses.forEach((guess) => {
    guess.characterInfo.forEach((ci, idx) => {
      if (ci === CharacterMatch.Correct) {
        hint[idx] = guess.guess[idx];
        letters = letters.filter((l) => l.index !== idx);
      }
    });
  });
  if (letters.length) {
    const hintLetter = letters[0];
    hint[hintLetter.index] = hintLetter.letter;
  }
  return hint.join("");
};

const service = new WordService();
const guessResponse = service.getGuessReport("plava", "plavu"); //?
getHint("plava", [guessResponse]); //?
