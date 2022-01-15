import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import Word from '../components/word'
import { CharacterMatch } from '../services/character-match.enum'


const LetterPage: NextPage = ({ letter }: { letter: string }) => {
  return (
    <div className="p-12">
      <Word word={"testić"} characterInfo={[CharacterMatch.Miss, CharacterMatch.WrongSpot, CharacterMatch.Correct]} />
    </div>
  )
}

export default LetterPage
