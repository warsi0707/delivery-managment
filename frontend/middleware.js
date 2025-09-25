import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
// This function can be marked `async` if using `await` inside
export function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const token = req.headers.get('token')?.value
    const publicRoute = ["/signin", "/signup"]
    const privateRoute = ["/admin:path*"]




}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/", "/signin", "/signup"],
}