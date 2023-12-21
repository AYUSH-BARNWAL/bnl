import { NextResponse } from "next/server";
import { verifyJwtToken } from "./auth";

const adminOnly = [];

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";
  if (token) {
    return verifyJwtToken(token).then((user) => {
      if (!user) {
        // user not found
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token");
        return response;
      } else {
        if (adminOnly.includes(path) && !user.isAdmin) {
          // checking admin previledges
          // console.log("page is admin only but you are not");
          return NextResponse.redirect(request.headers.get("referer")); // redirect to the previous url you were on
        }
        if (["/login", "/signup"].includes(path)) {
          // console.log("Cannot access this page if you are logged in");
          return NextResponse.redirect(new URL("/user", request.url));
        }
        return NextResponse.next();
      }
    });
  } else {
    if (!["/login", "/signup", "/"].includes(path)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
