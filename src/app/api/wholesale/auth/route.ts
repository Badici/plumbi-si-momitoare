import { NextResponse } from "next/server";
import {
  WHOLESALE_AUTH_COOKIE,
  WHOLESALE_AUTH_COOKIE_VALUE,
  WHOLESALE_PASSWORD,
} from "@/data/wholesale";

type AuthBody = {
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as AuthBody;
  if (body.password !== WHOLESALE_PASSWORD) {
    return NextResponse.json({ ok: false, message: "Parolă invalidă." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: WHOLESALE_AUTH_COOKIE,
    value: WHOLESALE_AUTH_COOKIE_VALUE,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
