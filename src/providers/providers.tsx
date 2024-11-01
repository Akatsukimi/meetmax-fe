"use client";

import { useState } from "react";

import { User } from "@/lib/types";

import ToastProvider from "./toast-provider";
import { AuthContext } from "./auth-provider";
import ReactQueryProvider from "./react-query-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const initialUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
  const [user, setUser] = useState<User>(initialUser);

  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
      <ToastProvider />
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </AuthContext.Provider>
  );
}
