import Controls from '@/components/controls';
import Cover from '@/components/cover';
import Guesser from '@/components/guesser';
import Player from '@/components/player';
import Scoreboard from '@/components/scoreboard';
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import useGame from '@/providers/game';
import { PauseIcon, PlayIcon, SkipForwardIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Page() {
  const { setCurrentTrack, currentTrack, toGuess, setFinished } = useGame()
  const [disabled, setDisabled] = useState(true)

  function next() {
    const nextTrack = toGuess.shift()
    if (nextTrack) {
      setCurrentTrack({
        track: nextTrack,
        guessed: false
      })
    } else {
      setFinished(true)
    }
  }

  useEffect(() => {
    setDisabled(!disabled)
  }, [currentTrack?.guessed])

  return (
    <main
      className={`flex min-h-screen flex-col items-center py-24 ${inter.className}`}
    >
      <div className="h-fit absolute inset-0 justify-end p-2">
        <Button className="border bg-white" onClick={() => signOut()}>Sign out</Button>
      </div>
      <Controls />
      {currentTrack &&
        (
          <>
            <Cover />
            <Player />
          </>
        )
      }
      <div className="flex justify-center space-x-4 mt-8">
        <Button variant={"default"} className="border bg-white" id="playButton">
          <PlayIcon />
          <PauseIcon />
        </Button>
        <Button variant={"default"} onClick={next} disabled={disabled} id="nextButton" className='w-fit border'>
          <PlayIcon className='-mr-2' />
          <SkipForwardIcon />
        </Button>
      </div>
      <div className="flex flex-col mt-8  justify-center  space-y-4 w-full md:w-3/4 xl:w-1/2 2xl:1/3 px-10">
        <Guesser />
        <Scoreboard />
      </div>
      <Toaster />
    </main>
  )
}


