'use client';

import {createContext, useContext, ReactNode} from "react";
import {io, Socket} from "socket.io-client";

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({children}: SocketProviderProps) => {


    const socket = io('http://localhost:8000', {withCredentials: true, autoConnect: false});

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};