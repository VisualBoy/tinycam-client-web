'use client';

import React from 'react';
import { useAppContext } from '../context/AppContext';

interface LiveProps {
  cameraId: number;
  onBack: () => void;
}

const Live: React.FC<LiveProps> = ({ cameraId, onBack }) => {
  const { server, login } = useAppContext();

  if (!server || !login) {
    return <div>Server and login information not available.</div>;
  }

  const streamUrl = `${server.url}/axis-cgi/mjpg/video.cgi?cameraId=${cameraId}&token=${login.token}`;

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
      >
        &larr; Back to Grid
      </button>
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <img
          src={streamUrl}
          alt={`Live stream for camera ${cameraId}`}
          className="absolute top-0 left-0 w-full h-full object-contain bg-black"
        />
      </div>
    </div>
  );
};

export default Live;
