import { signOut } from "@/lib/auth/signOut";

export default function LogoutButton() {
  return (
    <form action={signOut}>
      <button type="submit">Logout</button>
    </form>
  );
}
