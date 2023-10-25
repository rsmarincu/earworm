import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL, spotifyApi } from "@/lib/spotify";
import { Config } from "sst/node/config";
import { JWT } from "next-auth/jwt";

const SPOTIFY_REFRESH_TOKEN_URL = 'https://accounts.spotify.com/api/token'


async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        const basicAuth = Buffer.from(`${Config.SPOTIFY_CLIENT_ID}:${Config.SPOTIFY_CLIENT_SECRET}`).toString(
            'base64'
        )
        const resp = await fetch(
            SPOTIFY_REFRESH_TOKEN_URL,
            {
                method: "POST",
                body: JSON.stringify({
                    grant_type: 'refresh_token',
                    refresh_token: token.refreshToken,
                }),
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )

        const data = await resp.json()

        return {
            ...token,
            accessToken: data.access_token,
            accessTokenExpires: Date.now() + data.expires_in * 1000,
        }
    } catch (error) {
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        }
    }
}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: Config.SPOTIFY_CLIENT_ID,
            clientSecret: Config.SPOTIFY_CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, account, user }) {
            // initial sign in
            if (account && user) return {
                ...token,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                username: account.providerAccountId,
                accessTokenExpires: account.expires_at * 1000
            }
            // token is valid
            if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
                return token;
            }

            // access token expires -> refresh the token
            return await refreshAccessToken(token)
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken
            session.user.username = token.username
            return session
        }

    }
}

// token.access_token
export default NextAuth(authOptions)