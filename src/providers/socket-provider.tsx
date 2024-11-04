'use client';

import { createContext, useContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
    children: ReactNode;
}

const socket = io('http://localhost:8000', { withCredentials: true });

export const SocketContext = createContext<Socket>(socket);

export const SocketProvider = ({ children }: SocketProviderProps) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};