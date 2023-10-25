import { ApiHandler, useBody, useHeader, useHeaders } from "sst/node/api";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { Config } from "sst/node/config";

export const handler = ApiHandler(async (evt) => {
    const body = useBody()

    const api = SpotifyApi.withClientCredentials(
        Config.SPOTIFY_CLIENT_ID,
        Config.SPOTIFY_CLIENT_SECRET,
    )

    const items = await api.search("The Beatles", ["artist"])


    return {
        statusCode: 200,
        body: JSON.stringify({
            "TEST": "T"
        }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
    }
})  