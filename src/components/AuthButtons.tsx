"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const AuthButtons = () => {
  const session = useSession();

  return (
    <div>
      {session.status === "authenticated" ? (
        <Button onClick={() => signOut({ redirect: true })}>Log out</Button>
      ) : (
        <Button onClick={() => signIn("credentials")}>Log In</Button>
      )}
    </div>
  );
};

export default AuthButtons;
