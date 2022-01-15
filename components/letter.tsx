import React from "React";
import { CharacterMatch } from "../services/character-match.enum";

function Letter({ letter, status }: { letter: string, status: CharacterMatch | null }) {
    let additionalClasses = '';
    if (status === CharacterMatch.Correct) {
        additionalClasses += "bg-green-500 text-white";
    }
    else if (status === CharacterMatch.Miss) {
        additionalClasses += "bg-gray-500 text-white";
    }
    else if (status === CharacterMatch.WrongSpot) {
        additionalClasses += "bg-yellow-500 text-white";
    }
    return (
        <span className={`p-5 my-5 mx-1 border-2 border-black text-4xl font-bold w-20 h-20 inline-block text-center ${additionalClasses} `}>{letter.toUpperCase()}</span>
    )
}

export default Letter;