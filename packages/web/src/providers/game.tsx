import { Track } from "@spotify/web-api-ts-sdk";
import { PropsWithChildren, createContext, useContext, useState } from "react";


type CurrentTrack = {
    track: Track
    guessed: boolean
}


type GameState = {
    score: number
    setScore(score: number): void

    currentTrack?: CurrentTrack
    setCurrentTrack(track: CurrentTrack): void

    toGuess: Track[]
    setToGuess(tracks: Track[]): void

    guessed: Track[]
    setGuessed(tracks: Track[]): void

    finished: boolean
    setFinished(f: boolean): void
}

const useGame = (): GameState => {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error("Please use GameProvider in parent component");
    }

    return context;
};

const GameContext = createContext<GameState | null>(null);

export const GameProvider = (props: PropsWithChildren) => {
    const [score, setScore] = useState<number>(0);
    const [currentTrack, setCurrentTrack] = useState<CurrentTrack>()
    const [toGuess, setToGuess] = useState<Track[]>([])
    const [guessed, setGuessed] = useState<Track[]>([])
    const [finished, setFinished] = useState<boolean>(false)


    return (
        <GameContext.Provider value={{
            score,
            setScore,
            currentTrack,
            setCurrentTrack,
            toGuess,
            setToGuess,
            guessed,
            setGuessed,
            finished,
            setFinished
        }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default useGame