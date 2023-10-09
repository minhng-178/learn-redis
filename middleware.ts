import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userId = req.cookies.get("userId");

  const res = NextResponse.next();

  if (!userId) {
    res.cookies.set("userId", nanoid());
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
