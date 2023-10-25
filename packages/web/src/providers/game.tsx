import { eras, genres } from "@/lib/spotify";
import { PropsWithChildren, createContext, useContext, useState } from "react";


type Track = {
    id: string

}

type Game = {
    score: number
    genres: string
    eras: string

}
type GameState = {
    game: Game
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
    const [game, setGame] = useState<Game>({ score: 0, eras: eras[0].value, genres: genres[0].value });
    return (
        <GameContext.Provider value={{ game, setGame }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default useGame