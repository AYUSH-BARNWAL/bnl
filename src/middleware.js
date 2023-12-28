import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./app/(auth)/auth";

const adminRoutes = ["/admin"];

/**
 * @param {NextRequest} request
 */
export default async function middleware(request) {
  const {
    nextUrl: { pathname },
  } = request;
  const token = request.cookies.get("token")?.value || "";
  if (token) {
    const { payload } = await verifyJwtToken(token);
    if (payload) {
      if (["/login", "/signup"].includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      if (adminRoutes.includes(pathname)) {
        if (payload.isAdmin) {
          return NextResponse.next();
        }
        return NextResponse.json({
          message: "Page can be accessed by admin only",
        });
      }
      return NextResponse.next();
    } else {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  } else {
    if (["/", "/login", "/signup"].includes(pathname)) {
      return NextResponse.next();
    }
    // return NextResponse.redirect(new URL("/login", request.url));
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
