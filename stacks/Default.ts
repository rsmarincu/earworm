import { StackContext, NextjsSite } from "sst/constructs";

export function Default({ stack }: StackContext) {
  const site = new NextjsSite(stack, "site", {
    path: "packages/web",
    environment: {
      "NEXTAUTH_URL": process.env.NEXTAUTH_URL,
      "NEXTAUTH_SECRET": process.env.NEXTAUTH_SECRET,
      "SPOTIFY_CLIENT_ID": process.env.SPOTIFY_CLIENT_ID,
      "SPOTIFY_CLIENT_SECRET": process.env.SPOTIFY_CLIENT_SECRET
    }
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });
}
