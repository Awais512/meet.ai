"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  if (session) {
    return (
      <div className="flex flex-col gap-y-4">
        <p>Logged In as {session.user?.name}</p>
        <Button onClick={() => authClient.signOut()}>SignOut</Button>
      </div>
    );
  }

  return <div className="flex flex-col gap-y-10">Unprotected</div>;
}
