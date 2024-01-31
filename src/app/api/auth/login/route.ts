import { lucia } from "@/lib/auth/lucia";
import db from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { getErrorMessage } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    const validPassword = await new Argon2id().verify(
      user[0].password,
      password,
    );

    if (!validPassword) {
      return Response.json(
        {
          success: false,
          message: "Incorrect username or password",
        },
        { status: 500 },
      );
    }

    const session = await lucia.createSession(user[0].id.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    user[0].password = "";

    return Response.json({ success: true, user: user[0] });
  } catch (e) {
    return Response.json(
      { success: false, message: getErrorMessage(e) },
      { status: 500 },
    );
  }
}
