import { lucia } from "@/lib/auth/lucia";
import { validateRequest } from "@/lib/auth/validateRequest";
import { getErrorMessage } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const { session } = await validateRequest();

  if (!session) {
    return Response.json(
      {
        success: false,
      },
      { status: 500 },
    );
  }

  try {
    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (e) {
    return Response.json(
      {
        success: false,
        message: getErrorMessage(e),
      },
      { status: 500 },
    );
  }
}
