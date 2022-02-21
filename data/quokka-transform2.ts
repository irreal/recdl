import fs from "fs";

const allWords = fs
  .readFileSync("./data/words2.txt")
  .toString()
  .split("\n")
  .map((w) => w.trim())
  .filter((w) => w.length >= 5 && w.length <= 8);
fs.writeFileSync("./data/words.json", JSON.stringify(allWords.slice(0, 10000)));
