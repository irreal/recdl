import fs from "fs";

const allWords = fs.readFileSync("./data/words.txt").toString().split("\n");
fs.writeFileSync("./data/words.json", JSON.stringify(allWords.slice(1)));
