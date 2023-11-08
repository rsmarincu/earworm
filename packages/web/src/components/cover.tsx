import useGame from '@/providers/game';

const Cover: React.FC = () => {
    const { currentTrack, finished } = useGame()

    if (finished) {
        return <div className="w-full flex justify-center">
            <p className="font-bold bg-white border w-1/4 text-center border-gray-500 text-2xl px-4 py-2 rounded-md text-input">HIT START TO PLAY AGAIN!</p>
        </div>
    }

    const track = currentTrack?.track

    return (
        <>
            {track && (
                <div className='w-full justify-center flex border border-gray-500 shadow-md' style={{ maxWidth: track.album.images[0].width }}>
                    <svg className='aspect-square' >
                        <filter id="pixelate" x="0" y="0">
                            <feFlood x="4" y="4" height="2" width="2" />

                            <feComposite width="16" height="16" />

                            <feTile result="a" />

                            <feComposite in="SourceGraphic" in2="a"
                                operator="in" />

                            <feMorphology operator="dilate"
                                radius="8" />
                        </filter>

                        <image
                            preserveAspectRatio="xMidYMid"
                            filter={currentTrack?.guessed ? "" : "url(#pixelate)"}
                            xlinkHref={track.album.images[0].url} />
                    </svg>
                </div>
            )}
        </>

    )
}

export default Cover