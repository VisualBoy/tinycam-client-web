'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, BackwardIcon, ForwardIcon } from '@heroicons/react/24/solid';

const Timeline = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 300; // 5 minutes in seconds
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleScrub = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const timelineWidth = timelineRef.current.offsetWidth;
    const clickPosition = event.nativeEvent.offsetX;
    const newTime = (clickPosition / timelineWidth) * duration;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="bg-gray-800 p-4 rounded-lg w-full">
      <div className="flex justify-between items-center mb-2 text-white">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div
        ref={timelineRef}
        className="w-full bg-gray-700 h-2 rounded-lg cursor-pointer"
        onClick={handleScrub}
      >
        <div className="bg-blue-500 h-2 rounded-lg" style={{ width: `${progress}%` }}>
          <div className="relative h-4 w-4 bg-white rounded-full border-2 border-blue-500 -top-1" style={{ left: `${progress > 98 ? 98: progress}%` }}></div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button onClick={() => setCurrentTime(currentTime - 10)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold p-2 rounded-full flex items-center justify-center">
          <BackwardIcon className="h-6 w-6" />
        </button>
        <button onClick={handlePlayPause} className="bg-gray-700 hover:bg-gray-600 text-white font-bold p-2 rounded-full flex items-center justify-center">
          {isPlaying ? <PauseIcon className="h-8 w-8" /> : <PlayIcon className="h-8 w-8" />}
        </button>
        <button onClick={() => setCurrentTime(currentTime + 10)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold p-2 rounded-full flex items-center justify-center">
          <ForwardIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Timeline;
