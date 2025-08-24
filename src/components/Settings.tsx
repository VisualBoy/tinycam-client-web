'use client';

import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { useAppContext } from '../context/AppContext';

const Settings = () => {
  const { server, login } = useAppContext();
  const { settings, isLoading, error, updateSetting } = useSettings(server, login);

  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading settings: {error}</div>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <div className="space-y-4">
        {/* Background Mode */}
        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <label htmlFor="background-mode" className="font-semibold">
            Background Mode
          </label>
          <button
            id="background-mode"
            onClick={() =>
              updateSetting(
                'root.BackgroundMode',
                settings.backgroundMode ? 'off' : 'on'
              )
            }
            className={`px-4 py-2 rounded-md ${
              settings.backgroundMode
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {settings.backgroundMode ? 'On' : 'Off'}
          </button>
        </div>

        {/* Stream Profile */}
        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <label htmlFor="stream-profile" className="font-semibold">
            Stream Profile
          </label>
          <select
            id="stream-profile"
            value={settings.streamProfile}
            onChange={(e) =>
              updateSetting(
                'root.StreamProfile',
                e.target.value
              )
            }
            className="px-4 py-2 rounded-md bg-gray-600 text-white"
          >
            <option value={'main'}>Main</option>
            <option value={'sub'}>Sub</option>
            <option value={'auto'}>Auto</option>
          </select>
        </div>

        {/* Power Safe Mode */}
        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <label htmlFor="power-safe-mode" className="font-semibold">
            Power Safe Mode
          </label>
          <button
            id="power-safe-mode"
            onClick={() =>
              updateSetting(
                'root.PowerSafeMode',
                settings.powerSafeMode ? 'off' : 'on'
              )
            }
            className={`px-4 py-2 rounded-md ${
              settings.powerSafeMode
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {settings.powerSafeMode ? 'On' : 'Off'}
          </button>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <label htmlFor="notifications" className="font-semibold">
            Notifications
          </label>
          <button
            id="notifications"
            onClick={() =>
              updateSetting(
                'root.Notifications',
                settings.notifications ? 'off' : 'on'
              )
            }
            className={`px-4 py-2 rounded-md ${
              settings.notifications
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {settings.notifications ? 'On' : 'Off'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
