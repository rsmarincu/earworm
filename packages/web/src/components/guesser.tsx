import useGame from '@/providers/game';
import { Input } from "@/components/ui/input"
import { useState } from 'react';
import { Button } from './ui/button';
import { stringSimilarity } from "string-similarity-js";
import { FrownIcon } from 'lucide-react';


const threshold = 0.8
const wildcards = [
    " - ",
    "Remastered",
    "Remaster",
]

const Player: React.FC = () => {
    const [guess, setGuess] = useState("")
    const { currentTrack, setScore, setCurrentTrack, score, setGuessed, guessed, setFinished } = useGame()

    async function onGuess() {
        if (!currentTrack) {
            return
        }

        let trackName = currentTrack?.track?.artists[0].name.toLowerCase()
        wildcards.map(w => trackName = trackName.replace(w, ""))

        const g = guess.toLowerCase()
        if (stringSimilarity(trackName, g) > threshold) {
            setScore(score + 1)
            setCurrentTrack({
                track: currentTrack.track,
                guessed: true
            })
            setGuessed([...guessed, currentTrack.track])
        }
        setGuess("")
    }

    return (
        <div className="flex w-full space-x-2">
            <Input onChange={e => setGuess(e.target.value)} value={guess} type="text" placeholder="Guess the artist!" className='bg-white border text-input' />
            <Button onClick={onGuess} className='bg-white border'>Guess</Button>
            <Button onClick={() => setFinished(true)} className='bg-white border'>
                <p className='mr-1'>Give up</p>
                <FrownIcon></FrownIcon>
            </Button>
        </div>
    )
}

export default Player