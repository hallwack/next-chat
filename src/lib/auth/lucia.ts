import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import db from "../db";
import { sessionTable, userTable } from "../db/schema";
import { Google } from "arctic";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

type User = typeof userTable.$inferSelect;

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      name: attributes.name,
      username: attributes.username,
    };
  },
});

export const google = new Google(
  process.env.GOOGLE_AUTH_CLIENT_ID!,
  process.env.GOOGLE_AUTH_CLIENT_SECRET!,
  process.env.GOOGLE_AUTH_REDIRECT_URL!,
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes extends User { }
