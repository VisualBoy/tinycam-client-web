'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Server, Login, CameraSettings } from '@/types/tinycam';

type Theme = 'dark' | 'light' | 'system';

interface AppContextType {
  server: Server | null;
  login: Login | null;
  cameras: CameraSettings[];
  selectedCamera: CameraSettings | null;
  theme: Theme;
  ws: WebSocket | null;
  lastMessage: MessageEvent | null;
  setServer: (server: Server) => void;
  setLogin: (login: Login) => void;
  setCameras: (cameras: CameraSettings[]) => void;
  selectCamera: (camera: CameraSettings | null) => void;
  setTheme: (theme: Theme) => void;
  sendMessage: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [server, setServer] = useState<Server | null>({ url: 'http://localhost:8083' });
  const [login, setLogin] = useState<Login | null>({ token: 'your_token' });
  const [cameras, setCameras] = useState<CameraSettings[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<CameraSettings | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8081');
    setWs(socket);

    socket.onopen = () => console.log('WebSocket connected');
    socket.onclose = () => console.log('WebSocket disconnected');
    socket.onmessage = (event) => setLastMessage(event);

    return () => {
      socket.close();
    };
  }, []);

  const selectCamera = (camera: CameraSettings | null) => {
    setSelectedCamera(camera);
  };

  const sendMessage = (message: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  };

  const value = {
    server,
    login,
    cameras,
    selectedCamera,
    theme,
    ws,
    lastMessage,
    setServer,
    setLogin,
    setCameras,
    selectCamera,
    setTheme,
    sendMessage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
