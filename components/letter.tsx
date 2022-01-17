import React from "react";
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
        <div className={`grid my-5 mx-1 border-2 border-black w-10 h-10 md:w-20 md:h-20 ${additionalClasses} content-center justify-center`}>
            <span className={`text-sm md:text-3xl font-bold`}>{letter.toUpperCase()}</span>
        </div>
    )
}

export default Letter;