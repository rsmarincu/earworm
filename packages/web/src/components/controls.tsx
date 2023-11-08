import { useToast } from "@/components/ui/use-toast";
import sdk from "@/lib/ClientInstance";
import { Genre, genres } from '@/lib/spotify';
import useWindowSize from '@/lib/useWindowSize';
import useGame from '@/providers/game';
import { Track } from '@spotify/web-api-ts-sdk';
import { useState } from 'react';
import { Button } from './ui/button';
import { testTracks } from './ui/testTracks';

const Controls: React.FC = () => {
    const { toast } = useToast()
    const size = useWindowSize();

    const { setScore, setToGuess, setCurrentTrack, setFinished } = useGame()
    const [selectedGenres, setGenres] = useState<Array<Genre>>([genres[0]])

    async function onPlay() {
        setFinished(false)
        if (selectedGenres.length == 0) {
            toast({
                title: "Select some genres",
                description: "Please select at least one genre to start."
            })
            return
        }
        let tracks: Track[]
        if (process.env.NODE_ENV === "development") {
            tracks = testTracks

        } else {
            const resp = await sdk.recommendations.get({
                seed_genres: selectedGenres.map(g => g.value),
            })
            tracks = resp.tracks
        }

        const nextTrack = tracks.shift()
        if (!nextTrack) {
            setScore(0)
            setToGuess(tracks)
        } else {
            setScore(0)
            setCurrentTrack({
                track: nextTrack,
                guessed: false
            })
            setToGuess(tracks)
        }
    }


    let breakP = size.width > 1279 ? 5 : 3
    breakP = size.width > 1440 ? 6 : breakP

    function setSelectedGenres(genre: Genre) {
        if (selectedGenres.includes(genre)) {
            setGenres(selectedGenres.filter(g => g.value != genre.value))
            return
        }

        if (selectedGenres.length == 3) {
            toast({
                title: "Maximum genres selected",
                description: "You can select a maximum of 3 genres."
            })
            return
        }

        setGenres([...selectedGenres, genre])
    }


    return (
        <>
            <div className="flex flex-col space-y-10 w-full mb-8 ">
                <div className="w-full flex justify-center">
                    <p className="font-bold bg-white border w-1/4 text-center border-gray-500 text-2xl px-4 py-2 rounded-md text-input">SELECT A GENRE</p>
                </div>
                <div className='text-input'>
                    <div className="flex flex-col sm:grid grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-x-10 w-full px-10">
                        {genres.map((g, i) => {
                            return (
                                <div onClick={() => {
                                    setSelectedGenres(g)
                                }} key={i} className={`
                                            relative border-t-[1px] border-x-[1px] rounded-t-md transition-hover duration-150 ease-in-out border-gray-500 hover:-mt-3 py-2 -mb-5 w-full 
                                            ${i >= genres.length - breakP ? "sm:aspect-square rounded-md border" : ""}  
                                            ${selectedGenres.includes(g) ? " bg-teal-400 -mt-3 " : "bg-white"} 
                                            `}>
                                    <p className="font-bold text-2xl mx-2 2xl:text-4xl">{g.label}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="flex justify-center pt-4">
                    <Button id="playGameButton" className={"border bg-white border-gray-500"} onClick={onPlay}>START</Button>
                </div>
            </div>
        </>

    )
}

export default Controls