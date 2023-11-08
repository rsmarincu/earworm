export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';

            SPOTIFY_CLIENT_ID: string;
            SPOTIFY_CLIENT_SECRET: string;
            NEXTAUTH_URL: string
            NEXTAUTH_SECRET: string
        }
    }
}