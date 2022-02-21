import fs from "fs";

const allWords = fs
  .readFileSync("./data/words.txt")
  .toString()
  .split("\n")
  .filter((w) => w.length >= 5 && w.length <= 8);
fs.writeFileSync("./data/words.json", JSON.stringify(allWords.slice(1)));
