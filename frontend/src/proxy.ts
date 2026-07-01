import { NextRequest, NextResponse } from "next/server";
import { UserRoleEnum } from "./redux/feature/auth/user.enum";

const publicRoutes = ['/public', '/auth/user/login', '/auth/user/register', '/auth/studio/register', '/'];
const authBlockRoutes = ['/auth/user/login', '/auth/user/register', '/auth/studio/register'];
const studioRoutes = ['/subscription/plan'];

export default function proxy(req: NextRequest) {
    const credentials = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;
    const pathname = req.nextUrl.pathname;

    const isPublic = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`) || pathname.endsWith('.svg'));
    const isAuthBlock = authBlockRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
    const isStudioRoutes = studioRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
    const isAuthenticated = Boolean(credentials);

    if (isAuthenticated && isAuthBlock) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    if (isPublic) {
        return NextResponse.next();
    }
    if (!isAuthenticated && !isPublic) {
        return NextResponse.redirect(new URL("/auth/user/login", req.url));
    }
    if (isStudioRoutes && role != UserRoleEnum.STUDIO) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|api|.*\\..*).*)'],
};