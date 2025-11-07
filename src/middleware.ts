import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (req.nextUrl.pathname.startsWith("/video")) {
    res.headers.set("Permissions-Policy", "encrypted-media=*");
  }

  return res;
}
