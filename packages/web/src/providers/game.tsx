import { eras, genres } from "@/lib/spotify";
import { Track } from "@spotify/web-api-ts-sdk";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type Game = {
    score: number
    currentTrack?: CurrentTrack
    toGuess: Track[]
}

type CurrentTrack = {
    track: Track
    guessed: boolean
}


type GameState = {
    score: Game
    setGame(game: Game): void
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
    const [game, setGame] = useState<Game>({
        score: 0,
        toGuess: []
    });
    return (
        <GameContext.Provider value={{ game, setGame }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default useGame