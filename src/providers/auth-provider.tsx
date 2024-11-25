"use client";

import { getProfile } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/lib/types";
import { usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  updateAuthUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const routes = ["/login", "/signup", "/reset", "/verify"];
  const pathname = usePathname();
  const noFetchRoute = routes.includes(pathname);

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !noFetchRoute,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
