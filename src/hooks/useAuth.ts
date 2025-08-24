import { useState, useCallback } from 'react';
import { LoginResponse } from '@/types/tinycam';

const API_TIMEOUT = 10000;
const SERVER_URL = 'http://localhost:8083'; // Default server URL

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (username: string, password?: string) => {
    setError(null);
    const url = `${SERVER_URL}/api/v1/login?user=${username}&pwd=${password || ''}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json: { data: LoginResponse } = await response.json();
      if (json.data.token) {
        setToken(json.data.token);
      } else {
        throw new Error('Login failed: No token received.');
      }
    } catch (e) {
      clearTimeout(timeoutId);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
      setToken(null);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  return {
    token,
    error,
    login,
    logout,
    isAuthenticated: !!token,
  };
};
