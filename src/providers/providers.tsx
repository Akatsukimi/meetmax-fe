"use client";

import React, {useEffect, useState} from "react";

import {User} from "@/lib/types";

import ToastProvider from "./toast-provider";
import {AuthContext} from "./auth-provider";
import ReactQueryProvider from "./react-query-provider";
import {Provider as ReduxProvider} from "react-redux";
import {makeStore} from "@/lib/store";
import {SocketProvider} from "@/providers/socket-provider";

export function Providers({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <ReduxProvider store={makeStore()}>
            <AuthContext.Provider value={{user, updateAuthUser: setUser}}>
                <ToastProvider/>
                {user && (
                    <SocketProvider>
                        <ReactQueryProvider>{children}</ReactQueryProvider>
                    </SocketProvider>
                )}
            </AuthContext.Provider>
        </ReduxProvider>
    );
}