// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { WordService } from "../../services/word.service";
import kv from "@vercel/kv";
import { Game } from "../../data/models/game.model";

type Data = {
  id: string;
  hint: string;
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
  console.log("getting for id", id);
  if (!id) {
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
  const hintResponse = wordService.getHint(game.word, game.getGuesses());
  res.status(200).json({ id, hint: hintResponse });
}
