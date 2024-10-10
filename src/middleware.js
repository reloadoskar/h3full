import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
export async function middleware(request) {

    const jwt = cookies().get('usertoken')?.value
    // console.log(jwt)

    if (jwt === undefined) { 
        // console.log("no hay galleta")
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try { 
        // console.log("validanding token")
        const { payload } = await jwtVerify(jwt, new TextEncoder().encode(process.env.SECRET_KEY)) // console.log(payload)
        if(!payload) {
            return NextResponse.next()
        }
        // console.log('token ok')
        return NextResponse.next()

    } catch (error) {
        // console.error(error)
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/proyectos/:path*', '/clientes/:path*', '/login']
}