export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8000',
} as const;
