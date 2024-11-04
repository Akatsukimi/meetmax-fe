"use client";

import { User } from "@/lib/types";
import { createContext } from "react";

type AuthContextType = {
  user?: User | null;
  updateAuthUser: (data: User | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  updateAuthUser: () => {},
});
