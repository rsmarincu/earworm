import { useEffect, useState } from 'react'
import useSpotify from '@/hooks/useSpotify';


interface Props {
    songId: string
    blurred: boolean
}

const Cover: React.FC<Props> = ({ songId, blurred }) => {
    const [track, setTrack] = useState<SpotifyApi.SingleTrackResponse>()
    const spotifyApi = useSpotify()

    useEffect(() => {
        const getTrack = async () => {

            const song = await spotifyApi.getTrack(songId)

            setTrack(song.body)
        }
        getTrack()
    }, [songId]);


    return (
        <>
            {track && (
                <div className=" border-red-400" >
                    <svg width={track.album.images[0].width} height={track.album.images[0].height} >
                        <filter id="pixelate" x="0" y="0">
                            <feFlood x="4" y="4" height="2" width="2" />

                            <feComposite width="16" height="16" />

                            <feTile result="a" />

                            <feComposite in="SourceGraphic" in2="a"
                                operator="in" />

                            <feMorphology operator="dilate"
                                radius="8" />
                        </filter>

                        <image width={track.album.images[0].width} height={track.album.images[0].height}
                            preserveAspectRatio="xMidYMid"
                            filter={blurred ? "url(#pixelate)" : ""}
                            xlinkHref={track.album.images[0].url} />
                    </svg>
                </div>
            )}
        </>

    )
}

export default Cover