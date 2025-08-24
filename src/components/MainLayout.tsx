'use client';

import React, { useState } from 'react';
import CameraGrid from './CameraGrid';
import PTZControls from './PTZControls';
import EventList from './EventList';
import Timeline from './Timeline';
import Login from './Login';
import Settings from './Settings';
import Live from './Live';
import { useAuth } from '../hooks/useAuth';

type View = 'live' | 'events' | 'settings';

const MainLayout = () => {
  const [view, setView] = useState<View>('live');
  const [selectedCameraId, setSelectedCameraId] = useState<number | null>(null);
  const { isAuthenticated, login, logout, error } = useAuth();

  const navButtonClasses = (isActive: boolean) =>
    `px-4 py-2 font-bold rounded-t-lg ${isActive ? 'bg-gray-800 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-700'}`;

  const handleCameraSelect = (cameraId: number) => {
    setSelectedCameraId(cameraId);
  };

  const handleBackToGrid = () => {
    setSelectedCameraId(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <nav className="flex justify-between items-center border-b-2 border-gray-700">
        <div>
          <button onClick={() => setView('live')} className={navButtonClasses(view === 'live')}>
            Live View
          </button>
          <button onClick={() => setView('events')} className={navButtonClasses(view === 'events')}>
            Events & Timeline
          </button>
          <button onClick={() => setView('settings')} className={navButtonClasses(view === 'settings')}>
            Settings
          </button>
        </div>
        <button
          onClick={() => logout()}
          className="px-4 py-2 font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg"
        >
          Logout
        </button>
      </nav>

      <main className="p-4 bg-gray-800 rounded-b-lg">
        {error && <div className="text-red-500 bg-red-100 p-4 rounded-lg mb-4">{error}</div>}
        {view === 'live' && (
          <>
            {selectedCameraId ? (
              <Live cameraId={selectedCameraId} onBack={handleBackToGrid} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <CameraGrid onCameraSelect={handleCameraSelect} />
                </div>
                <div>
                  <PTZControls />
                </div>
              </div>
            )}
          </>
        )}

        {view === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">Event Playback</h2>
              {/* Placeholder for a larger video player for selected event */}
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <p className="text-white">Select an event to play</p>
              </div>
              <Timeline />
            </div>
            <div>
              <EventList />
            </div>
          </div>
        )}

        {view === 'settings' && <Settings />}
      </main>
    </div>
  );
};

export default MainLayout;
