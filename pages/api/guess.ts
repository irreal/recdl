// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "../../data/models/game.model";
import { GuessResponse } from "../../services/guess-response.type";
import { WordService } from "../../services/word.service";

type Data = {
  id: string;
  guesses: GuessResponse[];
  length: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const id = req.body.id;
  const guess = req.body.guess;
  if (!id || !guess) {
    res.status(400).end();
    return;
  }

  const repository = await getRepository();
  const game = await repository.fetch(id);
  if (!game || !game.entityId || game.entityId !== id || !game.word) {
    res.status(404).end();
    return;
  }
  const wordService = new WordService();
  const guessResponse = wordService.getGuessReport(game.word, guess);
  game.addGuess(guessResponse);
  await repository.save(game);
  res
    .status(200)
    .json({ id, length: game.word.length, guesses: game.getGuesses() });
}
