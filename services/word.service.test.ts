import { expect, test } from "vitest";
import { CharacterMatch } from "./character-match.enum";
import { GuessResponseType } from "./response-type.enum";
import { WordService } from "./word.service";

test("random word is valid", () => {
  const service = new WordService();
  const randomWord = service.getRandomWord();
  expect(randomWord).toBeDefined();
  expect(randomWord.length).toBeGreaterThan(0);
});

test("verify word exists", () => {
  const service = new WordService();
  expect(service.isWordPresent("zdrav")).toBe(true);
  expect(service.isWordPresent("asdfg")).toBe(false);
});

test("invalid guess", () => {
  const service = new WordService();
  expect(() => {
    service.getGuessReport("hello", "");
  }).toThrow();
  expect(() => {
    service.getGuessReport("", "hello");
  }).toThrow();
});

test("invalid length", () => {
  const service = new WordService();
  const response = service.getGuessReport("hello", "hell");
  expect(response).toEqual({
    type: GuessResponseType.IncorrectGuessLength,
    characterInfo: [],
  });
});

const correctResponse = {
  type: GuessResponseType.Correct,
  characterInfo: [
    CharacterMatch.Correct,
    CharacterMatch.Correct,
    CharacterMatch.Correct,
    CharacterMatch.Correct,
    CharacterMatch.Correct,
  ],
};
test("correct guess", () => {
  const service = new WordService();
  expect(service.getGuessReport("papir", "papir")).toEqual({
    ...correctResponse,
    guess: "papir",
  });
  expect(service.getGuessReport("slika", "slika")).toEqual({
    ...correctResponse,
    guess: "slika",
  });
  expect(service.getGuessReport("SLika", "slika")).toEqual({
    ...correctResponse,
    guess: "slika",
  });
});

test("invalid word guess", () => {
  const service = new WordService();
  expect(service.getGuessReport("zdrav", "asdfg").type).toEqual(
    GuessResponseType.GuessNotAValidWord
  );
});

test("incorrect guess", () => {
  const service = new WordService();
  const guessResponse = service.getGuessReport("zdrav", "slika");
  const incorrectMatchInfo = [
    CharacterMatch.Miss,
    CharacterMatch.Miss,
    CharacterMatch.Miss,
    CharacterMatch.Miss,
    CharacterMatch.WrongSpot,
  ];
  expect(guessResponse).toEqual({
    type: GuessResponseType.Incorrect,
    characterInfo: incorrectMatchInfo,
    guess: "slika",
  });
});

test.only("hints", () => {
  const service = new WordService();
  const guessResponse = service.getGuessReport("zdrav", "zraci");
  const hint = service.getHint("zdrav", [guessResponse]);
  expect(hint).toEqual("?l?k??");
});
