import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import { Config } from "sst/node/config";

if (!Config.SPOTIFY_CLIENT_ID) {
    throw new Error("Missing SPOTIFY_CLIENT_ID");
}

if (!Config.SPOTIFY_CLIENT_SECRET) {
    throw new Error("Missing SPOTIFY_CLIENT_SECRET");
}

const spotifyProfile = SpotifyProvider({
    clientId: Config.SPOTIFY_CLIENT_ID,
    clientSecret: Config.SPOTIFY_CLIENT_SECRET,
});

const authURL = new URL("https://accounts.spotify.com/authorize");


const scopes = [
    "user-read-email",
    "user-read-email",
    "streaming",
]

authURL.searchParams.append("scope", scopes.join(" "));

spotifyProfile.authorization = authURL.toString();

export default spotifyProfile;

export async function refreshAccessToken(token: JWT) {
    try {
        const response = await fetch(authURL, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            access_token: refreshedTokens.access_token,
            token_type: refreshedTokens.token_type,
            expires_at: refreshedTokens.expires_at,
            expires_in: (refreshedTokens.expires_at ?? 0) - Date.now() / 1000,
            refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
            scope: refreshedTokens.scope,
        };
    } catch (error) {
        console.error(error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}
