import { Inter } from 'next/font/google'
import Player from '@/components/player';
import { signOut, useSession } from 'next-auth/react';
import { Config } from 'sst/node/config';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import Cover from '@/components/cover';
import useGame from '@/providers/game';
import Controls from '@/components/controls';
import { Toaster } from "@/components/ui/toaster"
import Guesser from '@/components/guesser';
import { useEffect, useState } from 'react';
import { Track } from '@spotify/web-api-ts-sdk';

const inter = Inter({ subsets: ['latin'] })


export default function Page() {
  const game = useGame()
  const [disabled, setDisabled] = useState(true)

  function next() {
    const nextTrack = game.game.toGuess.shift()
    if (!nextTrack) {
      game.setGame({
        score: game.game.score,
        toGuess: game.game.toGuess
      })
    } else {
      game.setGame({
        score: game.game.score,
        currentTrack: {
          track: nextTrack,
          guessed: false,
        },
        toGuess: game.game.toGuess
      })
    }
  }

  useEffect(() => {
    setDisabled(!disabled)
  }, [game.game.currentTrack?.guessed])

  console.log(game.game.currentTrack?.track.name);

  return (
    <main
      className={`flex min-h-screen flex-col items-center  justify-between p-24 ${inter.className}`}
    >

      <Button onClick={() => signOut()}>Sign out</Button>
      <Controls />
      <h1 className='text-white'>Score: {game.game.score}</h1>
      {game.game.currentTrack &&
        (
          <div>
            <Cover />
            <Player />
          </div>
        )
      }
      <Guesser />
      <div className="flex justify-center space-x-4">
        <Button variant={"default"} id="playButton">Play</Button>
        <Button variant={"default"} onClick={next} disabled={disabled} id="nextButton" className='w-fit'>Next</Button>
      </div>
      <Toaster />
    </main>
  )
}


