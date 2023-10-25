import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "sst/node/api";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const resp = await fetch(Api.Api.url + "/search", {
        method: "POST",
        body: JSON.stringify({
            songId: "TEST"
        })
    })
    console.log(await resp.json())

    res.status(200).json({ name: "John Doe" });
}