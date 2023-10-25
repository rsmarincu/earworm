import { StackContext, NextjsSite, Config, Api } from "sst/constructs";

export function Default({ stack }: StackContext) {
  const SPOTIFY_CLIENT_ID = new Config.Secret(stack, "SPOTIFY_CLIENT_ID")
  const SPOTIFY_CLIENT_SECRET = new Config.Secret(stack, "SPOTIFY_CLIENT_SECRET")
  const NEXTAUTH_SECRET = new Config.Secret(stack, "NEXTAUTH_SECRET")

  const api = new Api(stack, "Api", {
    cors: true,
    defaults: {
      function: {
        bind: [SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET]
      }
    },
    routes: {
      "POST /search": "packages/functions/src/search.handler",
      "GET /auth": "packages/functions/src/auth.handler"
    },
  })

  const API_URL = new Config.Parameter(stack, "API_URL", {
    value: api.url,
  })

  const site = new NextjsSite(stack, "site", {
    path: "packages/web",
    bind: [api, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, API_URL, NEXTAUTH_SECRET],
    environment: {
      "NEXTAUTH_URL": "http://localhost:3000",
      "NEXTAUTH_SECRET": NEXTAUTH_SECRET.toString()
    }
  });

  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url
  });
} 
