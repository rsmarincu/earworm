import { z } from 'zod'

export const schema = z.object({
    NODE_ENV: z.enum(["development", "production"]),
    NEXTAUTH_URL: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
})

export const env = {
    NODE_ENV: process.env.NODE_ENV,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
}