'use client';

import React from 'react';
import { PlayIcon, PauseIcon, RewindIcon, FastForwardIcon } from '@heroicons/react/solid';

const Timeline = () => {
  const handleTimelineAction = (action: string) => {
    console.log(`Timeline Action: ${action}`);
    // Timeline logic to be implemented later
  };

  const buttonClasses = "bg-gray-700 hover:bg-gray-600 text-white font-bold p-2 rounded-full flex items-center justify-center";

  return (
    <div className="bg-gray-800 p-4 rounded-lg w-full">
      <h2 className="text-xl font-bold text-white mb-4 text-center">Timeline</h2>

      {/* Timeline Bar */}
      <div className="w-full bg-gray-700 h-4 rounded-lg mb-4">
        <div className="bg-blue-500 h-4 rounded-lg" style={{ width: '30%' }}></div>
        {/* A handle for scrubbing */}
        <div className="relative bottom-6 w-4 h-4 bg-white rounded-full border-2 border-blue-500" style={{ left: '30%' }}></div>
      </div>

      {/* Playback Controls */}
      <div className="flex justify-center items-center gap-4">
        <button onClick={() => handleTimelineAction('rewind')} className={buttonClasses}>
          <RewindIcon className="h-6 w-6" />
        </button>
        <button onClick={() => handleTimelineAction('play')} className={buttonClasses}>
          <PlayIcon className="h-8 w-8" />
        </button>
        <button onClick={() => handleTimelineAction('pause')} className={buttonClasses}>
          <PauseIcon className="h-8 w-8" />
        </button>
        <button onClick={() => handleTimelineAction('fast-forward')} className={buttonClasses}>
          <FastForwardIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Timeline;
