'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Server, Login, CameraSettings } from '@/types/tinycam';

interface AppContextType {
  server: Server | null;
  login: Login | null;
  cameras: CameraSettings[];
  selectedCamera: CameraSettings | null;
  setServer: (server: Server) => void;
  setLogin: (login: Login) => void;
  setCameras: (cameras: CameraSettings[]) => void;
  selectCamera: (camera: CameraSettings | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // For now, we'll use mock data. In a real app, this would be null
  // until the user logs in.
  const [server, setServer] = useState<Server | null>({ url: 'http://localhost:8083' });
  const [login, setLogin] = useState<Login | null>({ token: 'your_token' });

  const [cameras, setCameras] = useState<CameraSettings[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<CameraSettings | null>(null);

  const selectCamera = (camera: CameraSettings | null) => {
    setSelectedCamera(camera);
  };

  const value = {
    server,
    login,
    cameras,
    selectedCamera,
    setServer,
    setLogin,
    setCameras,
    selectCamera,
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
