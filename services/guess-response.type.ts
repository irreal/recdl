import { CharacterMatch } from "./character-match.enum";
import { GuessResponseType } from "./response-type.enum";
export type GuessResponse = {
  type: GuessResponseType;
  characterInfo: CharacterMatch[];
  guess: string;
};
