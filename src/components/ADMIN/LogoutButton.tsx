"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useTransition } from "react";

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      signOut({ callbackUrl: "/" });
    });
  };

  return (
    <div>
      <Button onClick={handleClick} disabled={isPending}>
        Signout
      </Button>
    </div>
  );
};

export default LogoutButton;
