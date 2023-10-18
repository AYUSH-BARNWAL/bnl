import { NextResponse, NextRequest } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPage = path === "/login";
  const token = request.cookies.get("token")?.value || "";
  if (isPublicPage && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPage && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/login",
    "/",
    "/user",
    "/signup",
    "/member",
    "/promoter",
    "/transaction",
    "/cashbook",
    "/bankbook",
    "/bankaccount",
  ],
};
