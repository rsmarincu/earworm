import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { GameProvider } from '@/providers/game';
import { ThemeProvider } from "next-themes"

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ThemeProvider defaultTheme='dark' enableSystem={false} attribute="class">
      <SessionProvider session={session}>
        <GameProvider>
          <Component {...pageProps} />
        </GameProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
