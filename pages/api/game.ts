// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GuessResponse } from "../../services/guess-response.type";
import { WordService } from "../../services/word.service";
import { Game } from "../../data/models/game.model";
import { generate } from "short-uuid";
import kv from "@vercel/kv";

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
  const wordService = new WordService();
  const game = new Game(generate(), wordService.getRandomWord(), []);
  await kv.set(game.id, JSON.stringify(game));
  res.status(200).json({
    id: game.id,
    length: game.word.length,
    guesses: game.getGuesses(),
  });
}
