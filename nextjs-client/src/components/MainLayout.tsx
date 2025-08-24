'use client';

import React, { useState } from 'react';
import CameraGrid from './CameraGrid';
import PTZControls from './PTZControls';
import EventList from './EventList';
import Timeline from './Timeline';

type View = 'live' | 'events';

const MainLayout = () => {
  const [view, setView] = useState<View>('live');

  const navButtonClasses = (isActive: boolean) =>
    `px-4 py-2 font-bold rounded-t-lg ${isActive ? 'bg-gray-800 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-700'}`;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <nav className="flex border-b-2 border-gray-700">
        <button onClick={() => setView('live')} className={navButtonClasses(view === 'live')}>
          Live View
        </button>
        <button onClick={() => setView('events')} className={navButtonClasses(view === 'events')}>
          Events & Timeline
        </button>
      </nav>

      <main className="p-4 bg-gray-800 rounded-b-lg">
        {view === 'live' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <CameraGrid />
            </div>
            <div>
              <PTZControls />
            </div>
          </div>
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
      </main>
    </div>
  );
};

export default MainLayout;
