import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

import SpotifyWebApi from "spotify-web-api-node";

export default function useSpotify() {
    const { data: session, status } = useSession();
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: 'http://localhost:3000/callback'
    });

    useEffect(() => {
        console.log(session)
        if (session) {
            // if rrefresh token fails (ihghly unlikely)
            if (session.error == "refresh token error") {
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken)
        }
    }, [session])

    return spotifyApi;
}