import useGame from "@/providers/game"


const Scoreboard: React.FC = () => {
    const { guessed, score } = useGame()
    return (
        <div className="bg-white rounded-md border p-2 w-full text-input">
            <div className="border-b rounded-t-md pb-2">
                <p className="text-input">Score: {score}</p>
            </div>
            <div className="mt-2">
                {
                    guessed.map((t, i) => {
                        return <div key={i} className="flex">
                            {i}.
                            {" "}
                            {t.artists.map(a => a.name).join(" ,")}
                            {" - "}
                            {t.name}
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Scoreboard