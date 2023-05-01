// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GuessResponse } from "../../services/guess-response.type";
import { WordService } from "../../services/word.service";
import kv from "@vercel/kv";
import { Game } from "../../data/models/game.model";

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

  const gameData: Game | null = await kv.get(id);
  if (!gameData || !gameData.id || gameData.id !== id || !gameData.word) {
    res.status(404).end();
    return;
  }
  const game = new Game(gameData.id, gameData.word, gameData.guesses);
  const wordService = new WordService();
  const guessResponse = wordService.getGuessReport(game.word, guess);
  game.addGuess(guessResponse);
  await kv.set(game.id, JSON.stringify(game));
  res
    .status(200)
    .json({ id, length: game.word.length, guesses: game.getGuesses() });
}
