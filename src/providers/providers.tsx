"use client";

import { useEffect, useState } from "react";
import { User } from "@/lib/types";
import ToastProvider from "./toast-provider";
import { AuthContext } from "./auth-provider";
import ReactQueryProvider from "./react-query-provider";
import { SocketProvider } from "@/providers/socket-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
      <ToastProvider />
      {user && (
        <SocketProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SocketProvider>
      )}
    </AuthContext.Provider>
  );
}
