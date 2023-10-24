import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("userLogin")?.value;
  const signInURL = new URL("/login", request.url);
  const dashboardURL = new URL("/", request.url);

  if (!token) {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/create-account" ||
      request.nextUrl.pathname === "/"
    )
      return NextResponse.next();
    return NextResponse.redirect(signInURL);
  }

  if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/create-account"
  )
    return NextResponse.redirect(dashboardURL);
}

export const config = {
  matcher: ["/", "/login", "/create-account", "/account", "/schedules"],
};
