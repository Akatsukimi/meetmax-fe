'use client';

import { createContext, PropsWithChildren, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { config } from '@/lib/config';

const socket = io(config.socketUrl, { withCredentials: true });

export const SocketContext = createContext<Socket>(socket);

export const SocketProvider = ({ children }: PropsWithChildren) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
