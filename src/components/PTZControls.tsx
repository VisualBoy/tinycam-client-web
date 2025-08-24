'use client';

import React from 'react';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@heroicons/react/solid';
import { useAppContext } from '@/context/AppContext';
import { useTinyCamAPI } from '@/hooks/useTinyCamAPI';

const PTZControls = () => {
  const { server, login, selectedCamera } = useAppContext();
  const { sendPtzCommand } = useTinyCamAPI(server, login);

  if (!server || !login) {
    // This should not happen if the component is used correctly, but it's a good safeguard.
    return null;
  }

  const handlePtzAction = async (action: string) => {
    if (!selectedCamera) {
      console.warn('No camera selected for PTZ action.');
      return;
    }

    let params = {};
    switch (action) {
      case 'up':
        params = { continuouspantiltmove: '0,100' };
        break;
      case 'down':
        params = { continuouspantiltmove: '0,-100' };
        break;
      case 'left':
        params = { continuouspantiltmove: '-100,0' };
        break;
      case 'right':
        params = { continuouspantiltmove: '100,0' };
        break;
      case 'zoom-in':
        params = { continuouszoommove: '100' };
        break;
      case 'zoom-out':
        params = { continuouszoommove: '-100' };
        break;
      default:
        return;
    }

    try {
      await sendPtzCommand(selectedCamera.id, params);
      console.log(`PTZ action '${action}' sent successfully.`);
      // We might want to add a stop command after a short delay
      // For now, we assume the user will press another button or a stop button
    } catch (error) {
      console.error(`Failed to send PTZ action '${action}':`, error);
    }
  };

  const isDisabled = !selectedCamera;
  const buttonClasses = `bg-gray-700 hover:bg-gray-600 text-white font-bold p-4 rounded-lg flex items-center justify-center ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4 text-center">PTZ Controls</h2>
      {isDisabled && <p className="text-center text-yellow-400 mb-2">Select a camera to enable PTZ</p>}
      <div className="grid grid-cols-3 gap-2 w-64 mx-auto">
        <div />
        <button onClick={() => handlePtzAction('up')} className={buttonClasses} disabled={isDisabled}>
          <ArrowUpIcon className="h-6 w-6" />
        </button>
        <div />

        <button onClick={() => handlePtzAction('left')} className={buttonClasses} disabled={isDisabled}>
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 bg-gray-600 rounded-full" />
        </div>
        <button onClick={() => handlePtzAction('right')} className={buttonClasses} disabled={isDisabled}>
          <ArrowRightIcon className="h-6 w-6" />
        </button>

        <div />
        <button onClick={() => handlePtzAction('down')} className={buttonClasses} disabled={isDisabled}>
          <ArrowDownIcon className="h-6 w-6" />
        </button>
        <div />
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button onClick={() => handlePtzAction('zoom-in')} className={buttonClasses} disabled={isDisabled}>
          <ZoomInIcon className="h-6 w-6" />
        </button>
        <button onClick={() => handlePtzAction('zoom-out')} className={buttonClasses} disabled={isDisabled}>
          <ZoomOutIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default PTZControls;
