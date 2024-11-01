"use client";

import { useEffect, useState } from "react";

import { User } from "@/lib/types";

import ToastProvider from "./toast-provider";
import { AuthContext } from "./auth-provider";
import ReactQueryProvider from "./react-query-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser as string));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
      <ToastProvider />
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </AuthContext.Provider>
  );
}
