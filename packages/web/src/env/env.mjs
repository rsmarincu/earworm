import { schema, env as _serverEnv } from "./schema.mjs"

const _env = schema.safeParse(_serverEnv)

if (!_env.success) {
    console.error(
        "Invalid env vars: \n",
        _env.error.format()
    );
    throw new Error("Invalid env vars")
}

export const env = { ..._env.data }