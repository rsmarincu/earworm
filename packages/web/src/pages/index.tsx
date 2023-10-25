import { Inter } from 'next/font/google'
import Player from '@/components/player';
import { signOut, useSession } from 'next-auth/react';
import { Config } from 'sst/node/config';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import Cover from '@/components/cover';
import useGame from '@/providers/game';
import Controls from '@/components/controls';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

interface Props {
  url: string
  clientId: string
}

export default function Page({ url }: Props) {

  // const { data: session } = useSession()
  // if (!session) {
  //   return
  // }
  const songId = "6BZjN6j79mjz7PJfGmvCR1"
  const game = useGame()

  return (
    <main
      className={`flex min-h-screen flex-col items-center  justify-between p-24 ${inter.className}`}
    >
      <Button onClick={() => signOut()}>Sign out</Button>
      <Controls />
      <h1 className='text-white'>Score: {game.game.score}</h1>
      <Cover songId={songId} blurred />
      <Player songId={songId} />
      <Button variant={"default"} id="playButton">Play</Button>
      <Toaster />
    </main>
  )
}


export const getStaticProps = (async (context) => {
  const url = Config.API_URL
  const clientId = Config.SPOTIFY_CLIENT_ID

  return { props: { url, clientId } }
}) satisfies GetStaticProps<{ url: string }>