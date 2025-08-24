'use client';

import React from 'react';
import { CameraSettings } from '@/types/tinycam';

interface CameraViewProps {
  camera: CameraSettings;
  serverUrl: string; // e.g., http://localhost:8083
  token: string;
}

const CameraView: React.FC<CameraViewProps> = ({ camera, serverUrl, token }) => {
  // The MJPEG stream URL is typically /mjpeg/<cam_id>?token=<token>
  // This might need adjustment based on the exact API.
  const streamUrl = `${serverUrl}/mjpeg/${camera.id}?token=${token}`;

  return (
    <div className="border p-4 rounded-lg bg-black">
      <h3 className="font-bold text-white mb-2">{camera.name}</h3>
      <div className="aspect-video bg-gray-800">
        {/* The 'unoptimized' prop is used because this is an external, dynamic image source */}
        {/* In a real scenario, you might need to handle errors if the stream fails to load */}
        <img
          src={streamUrl}
          alt={`Live stream from ${camera.name}`}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default CameraView;
