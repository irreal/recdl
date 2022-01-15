import React from "React";
import { CharacterMatch } from "../services/character-match.enum";
import Letter from "./letter";

function Word({ word, characterInfo }: { word: string, characterInfo?: CharacterMatch[] }) {
    return (
        <div className="flex flex-row">
            {word.split('').map((letter, index) => <Letter key={index} letter={letter} status={characterInfo ? characterInfo[index] : null} />)}
        </div>
    )
}

export default Word;