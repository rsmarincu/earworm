import { StackContext, NextjsSite, Config, Api } from "sst/constructs";

export function Default({ stack }: StackContext) {
  const SPOTIFY_CLIENT_ID = new Config.Secret(stack, "SPOTIFY_CLIENT_ID")
  const SPOTIFY_CLIENT_SECRET = new Config.Secret(stack, "SPOTIFY_CLIENT_SECRET")
  const NEXTAUTH_SECRET = new Config.Secret(stack, "NEXTAUTH_SECRET")


  const site = new NextjsSite(stack, "site", {
    path: "packages/web",
    bind: [SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, NEXTAUTH_SECRET],
    environment: {
      "NEXTAUTH_URL": "http://localhost:3000",
      "NEXTAUTH_SECRET": NEXTAUTH_SECRET.toString()
    }
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });
} 
