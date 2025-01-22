"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const AuthButtons = () => {
  const session = useSession();

  return (
    <div>
      {session.status === "authenticated" ? (
        <Button
          className="rounded-xl bg-blue-500 text-white"
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        >
          Log out
        </Button>
      ) : (
        <Button
          className="rounded-xl bg-blue-500 text-white"
          onClick={() => signIn("credentials")}
        >
          Log In
        </Button>
      )}
    </div>
  );
};

export default AuthButtons;
