import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";

export const getSession = async () => {
  const session = await getServerSession(AuthOptions);
  return session;
};

export const generatePassword = () => {
  return Math.floor(Math.random() * 1000 + 1000).toString();
};

export const empTypes = (empType: string) => {
  switch (empType) {
    case "FULL_TIME":
      return "Full Time";

    case "PART_TIME":
      return "Part Time";

    case "CONTRACT":
      return "Contract";

    case "INTERNSHIP":
      return "Internship";

    case "TEMPORARY":
      return "Temporary";
  }
};
