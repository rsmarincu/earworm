import { ApiHandler } from "sst/node/api";
import { Config } from "sst/node/config";
import { AccessTokenResponse } from '../../core/model/spotify'

const SPOTIFY_URL = 'https://accounts.spotify.com/api/token'

export const handler = ApiHandler(async () => {
    const authToken = Buffer.from(Config.SPOTIFY_CLIENT_ID + ':' + Config.SPOTIFY_CLIENT_SECRET).toString('base64')
    const res = await fetch(SPOTIFY_URL, {
        method: "POST",
        headers: {
            'Authorization': 'Basic ' + authToken,
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        body: 'grant_type=client_credentials'
    })
    const jsonBody = await res.json() as AccessTokenResponse
    console.log(jsonBody)
    return {
        statusCode: 200,
        body: JSON.stringify(
            jsonBody
        )
    }
})