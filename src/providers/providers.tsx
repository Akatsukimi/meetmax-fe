"use client";

import ToastProvider from "./toast-provider";
import AuthProvider from "./auth-provider";
import ReactQueryProvider from "./react-query-provider";
import { SocketProvider } from "@/providers/socket-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <ToastProvider />
        <SocketProvider>{children}</SocketProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
