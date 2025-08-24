'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTinyCamAPI } from './useTinyCamAPI';
import { Server, Login, Status } from '@/types/tinycam';

export const useSettings = (server: Server | null, login: Login | null) => {
  const [settings, setSettings] = useState<Partial<Status>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getStatusGlobal } = useTinyCamAPI(server, login);

  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const status = await getStatusGlobal();
      setSettings(status);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [getStatusGlobal]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSetting = async (param: string, value: string) => {
    if (!server || !login) {
      setError('Server and login information must be provided.');
      return;
    }

    try {
      const url = `${server.url}/param.cgi?action=update&${param}=${value}&token=${login.token}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to update setting: ${response.statusText}`);
      }

      // Refetch settings to get the latest state
      await fetchSettings();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return { settings, isLoading, error, updateSetting, refetchSettings: fetchSettings };
};
