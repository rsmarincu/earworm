import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {
        NEXTAUTH_URL: z.string().min(1),
        NEXTAUTH_SECRET: z.string().min(1),
        SPOTIFY_CLIENT_ID: z.string().min(1),
        SPOTIFY_CLIENT_SECRET: z.string().min(1),
        NODE_ENV: z.enum(["development", "test", "production"]),
    },

    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {
        // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NODE_ENV: process.env.NODE_ENV
    },
    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
     * This is especially useful for Docker builds.
     */
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});