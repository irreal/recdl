// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "../../data/models/game.model";
import { WordService } from "../../services/word.service";

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

  const repository = await getRepository();
  const game = await repository.fetch(id);
  if (!game || !game.entityId || game.entityId !== id || !game.word) {
    res.status(404).end();
    return;
  }
  const wordService = new WordService();
  const hintResponse = wordService.getHint(game.word, game.getGuesses());
  res.status(200).json({ id, hint: hintResponse });
}
