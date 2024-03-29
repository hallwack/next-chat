import { google, lucia } from "@/lib/auth/lucia";
import db from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { getErrorMessage } from "@/lib/utils";
import { GoogleTokens, OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { cookies } from "next/headers";

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const storedCodeVerifier =
    cookies().get("google_oauth_code_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    !storedCodeVerifier ||
    state !== storedState
  )
    new Response(null, { status: 400 });

  try {
    const tokens: GoogleTokens = await google.validateAuthorizationCode(
      code!,
      storedCodeVerifier!,
    );
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const googleUser: GoogleUser = await response.json();

    const existingUser = await db.query.userTable.findFirst({
      where: (user, { eq }) => eq(user.googleId, googleUser.sub),
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    } else {
      const user = await db
        .insert(userTable)
        .values({
          id: generateId(20),
          name: googleUser.name,
          email: googleUser.email,
          googleId: googleUser.sub,
        })
        .returning({ id: userTable.id });

      const session = await lucia.createSession(user[0].id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(getErrorMessage(e), {
        status: 400,
      });
    }
    return new Response(getErrorMessage(e), {
      status: 500,
    });
  }
}

type GoogleUser = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  locale: string;
};
