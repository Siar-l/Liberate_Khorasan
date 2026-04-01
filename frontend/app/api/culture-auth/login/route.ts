import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";

const SESSION_COOKIE_NAME = "culture_admin_session";

const hashValue = (value: string) =>
  createHash("sha256").update(value).digest("hex");

export async function POST(request: Request) {
  const expectedPassword = process.env.CULTURE_ADMIN_PASSWORD;

  if (!expectedPassword) {
    return NextResponse.json(
      { error: "Server is missing CULTURE_ADMIN_PASSWORD." },
      { status: 500 }
    );
  }

  let password = "";

  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    password = "";
  }

  const expectedHash = Buffer.from(hashValue(expectedPassword), "utf8");
  const passwordHash = Buffer.from(hashValue(password), "utf8");

  const isValid = timingSafeEqual(expectedHash, passwordHash);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const sessionSecret =
    process.env.CULTURE_ADMIN_SESSION_SECRET ?? expectedPassword;
  const token = hashValue(`${Date.now()}-${sessionSecret}`);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
