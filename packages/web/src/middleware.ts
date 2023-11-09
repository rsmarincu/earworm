import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { env } from "./env/env.mjs";

export async function middleware(req: NextRequest) {
    console.log("___________ ", env.NEXTAUTH_URL, "___________")
    const token = await getToken({ req })

    const { pathname } = req.nextUrl
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }
    if (!token && pathname != "/login") {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}