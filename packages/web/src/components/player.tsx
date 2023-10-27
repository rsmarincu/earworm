import useGame from '@/providers/game';
import { useEffect, useState } from 'react'

const Player: React.FC = () => {
    const game = useGame()

    useEffect(() => {
        let uri = `spotify:track:${game.game.currentTrack?.track.id}`
        let script = document.createElement("script");
        script.src = "https://open.spotify.com/embed/iframe-api/v1"
        script.async = true
        document.body.appendChild(script);

        if (game.game.currentTrack) {
            window.onSpotifyIframeApiReady = (IFrameAPI) => {
                const element = document.getElementById("embed-iframe");
                const options = {
                    width: '100%',
                    height: '0',
                    uri: uri,
                };
                const callback = (EmbedController) => {
                    const togglePlayButton = document.getElementById('playButton')
                    togglePlayButton?.addEventListener("click", () => {
                        EmbedController.togglePlay()
                    })
                    const nextButton = document.getElementById("nextButton")
                    nextButton?.addEventListener("click", () => {
                        const uris = game.game.toGuess.map(t => t.id)
                        const nextUri = uris.shift()
                        EmbedController.loadUri(`spotify:track:${nextUri}`)
                    })
                };
                IFrameAPI.createController(element, options, callback);
            };
        }

        return () => {
            script.remove()
        }
    }, [game.game.currentTrack]);

    return (
        <div id="embed-iframe"></div>
    )
}

export default Player