import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { clsx, type ClassValue } from "clsx";
import { getServerSession } from "next-auth";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSession = async () => {
  return await getServerSession(AuthOptions);
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

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export const formatNumber = (value: string, type: "aadhar" | "mobile") => {
  switch (type) {
    case "aadhar":
      return `${value.slice(0, 4)}-${value.slice(4, 8)}-${value.slice(8, 12)} `;

    case "mobile":
      return `+91-${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
  }
};
