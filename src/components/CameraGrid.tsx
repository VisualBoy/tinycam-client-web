'use client';

import React, { useState, useEffect } from 'react';
import { useTinyCamAPI } from '@/hooks/useTinyCamAPI';
import { CameraSettings } from '@/types/tinycam';
import { useAppContext } from '@/context/AppContext';

interface CameraGridProps {
  onCameraSelect: (cameraId: number) => void;
}

const CameraGrid: React.FC<CameraGridProps> = ({ onCameraSelect }) => {
  const { server, login, cameras, setCameras, selectedCamera, selectCamera } = useAppContext();

  const api = useTinyCamAPI(server!, login!);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!server || !login) {
      setError("Server or login details are not configured.");
      setIsLoading(false);
      return;
    }

    const fetchCameras = async () => {
      try {
        const cameraList = await api.getCamList();
        setCameras(cameraList);
        if (cameraList.length > 0 && !selectedCamera) {
          // Select the first camera by default
          selectCamera(cameraList[0]);
        }
      } catch (err) {
        setError('Failed to fetch cameras. Make sure the tinyCam server is running and accessible.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCameras();
    // The dependency array is complex. We only want to run this once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!server || !login) {
    return <div className="text-yellow-500">Please configure server and login details.</div>
  }

  if (isLoading) {
    return <div>Loading cameras...</div>;
  }

  if (error) {
    return <div className="text-red-500 mb-4">{error}</div>;
  }

  const getStreamUrl = (cameraId: number) => {
    if (!server || !login) return '';
    return `${server.url}/axis-cgi/mjpg/video.cgi?cameraId=${cameraId}&token=${login.token}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Live View</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cameras.length > 0 ? (
          cameras.map((camera) => (
            <div
              key={camera.id}
              onClick={() => onCameraSelect(camera.id)}
              className={`cursor-pointer rounded-lg overflow-hidden border-4 ${selectedCamera?.id === camera.id ? 'border-blue-500' : 'border-transparent'}`}
            >
              <img
                src={getStreamUrl(camera.id)}
                alt={`Camera ${camera.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full">
                {camera.name}
              </div>
            </div>
          ))
        ) : (
          <p>No cameras found.</p>
        )}
      </div>
    </div>
  );
};

export default CameraGrid;
