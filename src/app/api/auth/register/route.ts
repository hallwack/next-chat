import { lucia } from "@/lib/auth/lucia";
import db from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import { getErrorMessage } from "@/lib/utils";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";

export async function POST(req: Request) {
  const { name, username, email, password } = await req.json();

  const hashedPassword = await new Argon2id().hash(password);

  try {
    const user = await db
      .insert(userTable)
      .values({
        id: generateId(20),
        name,
        username,
        email,
        password: hashedPassword,
      })
      .returning({ id: userTable.id });

    const session = await lucia.createSession(user[0].id.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return Response.json({ success: true }, { status: 200 });
  } catch (e) {
    return Response.json(
      { success: false, message: getErrorMessage(e) },
      { status: 500 },
    );
  }
}
