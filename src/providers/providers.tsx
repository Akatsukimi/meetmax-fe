"use client";

import { useEffect, useState } from "react";
import { User } from "@/lib/types";
import ToastProvider from "./toast-provider";
import { AuthContext } from "./auth-provider";
import ReactQueryProvider from "./react-query-provider";
import { Provider as ReduxProvider } from "react-redux";
import { makeStore } from "@/lib/store";

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser as string));
    }
  }, []);

  return (
    <ReduxProvider store={makeStore()}>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        <ToastProvider />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </AuthContext.Provider>
    </ReduxProvider>
  );
}
