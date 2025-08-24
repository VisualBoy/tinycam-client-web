import { useCallback } from 'react';
import {
  CameraSettings,
  EventRecord,
  Server,
  Login,
  ServerResponse,
  Status,
} from '@/types/tinycam';

const API_TIMEOUT = 10000;

export const useTinyCamAPI = (server: Server | null, login: Login | null) => {
  const getRequest = useCallback(async <T>(request: string): Promise<T> => {
    if (!server || !login) {
      throw new Error('Server and login information must be provided.');
    }
    const char = request.includes('?') ? '&' : '?';
    const url = `${server.url}${request}${char}token=${login.token}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json: ServerResponse<T> = await response.json();
      return json.data;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }, [server, login]);

  const getCamList = useCallback(async (): Promise<CameraSettings[]> => {
    return getRequest<CameraSettings[]>('/api/v1/get_cam_list');
  }, [getRequest]);

  const getEventList = useCallback(async (
    cameraId: number,
    endtime: number,
    limit: number,
    type: string,
    filter: string
  ): Promise<EventRecord[]> => {
    const params = new URLSearchParams({
      cameraId: cameraId.toString(),
      endtime: endtime.toString(),
      count: limit.toString(),
      type,
      filter,
    });
    return getRequest<EventRecord[]>(`/api/v1/get_cam_event_list?${params.toString()}`);
  }, [getRequest]);

  const getStatusGlobal = useCallback(async (): Promise<Status> => {
    return getRequest<Status>('/api/v1/get_status');
  }, [getRequest]);

  const getStatusCamera = useCallback(async (cameraId: number): Promise<Status> => {
    return getRequest<Status>(`/api/v1/get_status?cameraId=${cameraId}`);
  }, [getRequest]);

  const sendPtzCommand = useCallback(async (cameraId: number, params: Record<string, string>): Promise<void> => {
    if (!server || !login) {
      throw new Error('Server and login information must be provided.');
    }
    const searchParams = new URLSearchParams(params);
    // PTZ commands don't return a JSON body, so we don't use the standard getRequest
    const url = `${server.url}/axis-cgi/com/ptz.cgi?camera=${cameraId}&token=${login.token}&${searchParams.toString()}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Don't need to process the response body for PTZ commands
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }, [server, login]);

  // Placeholder for WebSocket logic
  const connectWebSocket = useCallback(() => {
    // TODO: Implement WebSocket connection
    console.log('WebSocket connection not implemented yet.');
  }, []);

  return {
    getCamList,
    getEventList,
    getStatusGlobal,
    getStatusCamera,
    sendPtzCommand,
    connectWebSocket,
  };
};
