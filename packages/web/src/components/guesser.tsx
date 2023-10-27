import useGame from '@/providers/game';
import { Input } from "@/components/ui/input"
import { useState } from 'react';
import { Button } from './ui/button';
import { stringSimilarity } from "string-similarity-js";


const threshold = 0.8
const wildcards = [
    " - ",
    "Remastered",
    "Remaster",
]

const Player: React.FC = () => {
    const [guess, setGuess] = useState("")
    const game = useGame()

    async function onGuess() {
        if (!game.game.currentTrack) {
            return
        }
        let trackName = game.game.currentTrack?.track?.name.toLowerCase()
        wildcards.map(w => trackName = trackName.replace(w, ""))

        const g = guess.toLowerCase()
        if (stringSimilarity(trackName, g) > threshold) {
            game.setGame({
                score: game.game.score + 1,
                toGuess: game.game.toGuess,
                currentTrack: {
                    track: game.game.currentTrack.track,
                    guessed: true
                }
            })
        }
        setGuess("")
    }

    return (
        <div className="flex w-1/2 space-x-2">
            <Input onChange={e => setGuess(e.target.value)} value={guess} type="text" placeholder="Guess which song is playing!" />
            <Button onClick={onGuess}>Guess</Button>
        </div>
    )
}

export default Player