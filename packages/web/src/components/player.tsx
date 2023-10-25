import { useEffect, useState } from 'react'
import useSpotify from '@/hooks/useSpotify';

interface Props {
    songId: string
}

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

const Player: React.FC<Props> = ({ songId, token }) => {
    const spotifyApi = useSpotify()

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://open.spotify.com/embed/iframe-api/v1"
        script.async = true
        document.body.appendChild(script);

        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = document.getElementById('embed-iframe');
            const options = {
                width: '100%',
                height: '0',
                uri: `spotify:track:${songId}`
            };
            const callback = (EmbedController) => {
                const button = document.getElementById('playButton')
                button?.addEventListener("click", () => {
                    EmbedController.togglePlay()
                })
            }; IFrameAPI.createController(element, options, callback);
        };
    }, [songId]);

    return (
        <div id="embed-iframe"></div>

    )
}

export default Player