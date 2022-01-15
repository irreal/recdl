import type { NextPage } from 'next'
import Head from 'next/head'
import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import Word from '../components/word';
import { GuessResponse } from '../services/guess-response.type';
import { GuessResponseType } from '../services/response-type.enum';


type gameData = { length: number, id: string, guess: string, guesses: GuessResponse[] };
const Home: NextPage = () => {
  const formRef = useRef(null)
  const [game, setGame] = useState<gameData | null>(null);
  useEffect(() => {
    async function getNewGame() {
      const response = await fetch('/api/game', { method: 'POST' });
      const data = await response.json();
      console.log(data);
      setGame(data);
    }
    getNewGame();
  }, [setGame]);
  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current as any;
    const guess = form['guess'].value;

    async function makeGuess() {
      const response = await fetch(`/api/guess`, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ guess, id: game?.id }) });
      const data = (await response.json()) as gameData;
      setGame(data);
    }

    makeGuess();

  }
  return (
    <div className="p-5">
      <Head>
        <title>Rečdl</title>
        <meta name="description" content="Kao Wordle, ali na Srpskom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">
            Rečdl
          </span>
        </div>
        <div className="flex-none">
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <div className="card card-bordered">
          <div className="card-body">
            <div className="card-title">Pokušajte da pogodite reč</div>
            {game?.guesses.filter(g => g.type !== GuessResponseType.IncorrectGuessLength && g.type !== GuessResponseType.GuessNotAValidWord).map((guess, index) => <div key={index}><Word word={guess.guess} characterInfo={guess.characterInfo} /></div>)}
            <div><Word word={' '.repeat(game?.length ?? 0)} characterInfo={undefined} /></div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pokušaj:</span>
              </label>
              <form ref={formRef} onSubmit={handleSubmission}>
                <input id="guess" type="text" placeholder="" className="input input-lg input-bordered"></input>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="card card-bordered">
            <div className="card-body">
              <div className="card-title">Info o igri:</div>
              {game ? <p>{game.id} - {game.length}</p> : <p>Loading...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
