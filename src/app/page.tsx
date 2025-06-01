"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onRequest: (ctx) => {},
        onSuccess: (ctx) => {
          window.alert("Success");
        },
        onError: (ctx) => {
          window.alert(ctx.error.message);
        },
      }
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: (ctx) => {},
        onSuccess: (ctx) => {
          window.alert("Success");
        },
        onError: (ctx) => {
          window.alert(ctx.error.message);
        },
      }
    );
  };

  const { data: session } = authClient.useSession();

  if (session) {
    return (
      <div className="flex flex-col gap-y-4">
        <p>Logged In as {session.user?.name}</p>
        <Button onClick={() => authClient.signOut()}>SignOut</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="mt-10 flex flex-col gap-y-4 p-4">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit}>Create User</Button>
      </div>

      <div className="mt-10 flex flex-col gap-y-4 p-4">
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  );
}
