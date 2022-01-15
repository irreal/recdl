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
  const repository = await getRepository();
  const game = repository.createEntity();
  const wordService = new WordService();
  game.word = wordService.getRandomWord();
  await repository.save(game);
  res.status(200).json({
    id: game.entityId,
    length: game.word.length,
    guesses: game.getGuesses(),
  });
}
