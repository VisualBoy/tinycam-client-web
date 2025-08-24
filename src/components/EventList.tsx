'use client';

import React, { useState, useEffect } from 'react';
import { useTinyCamAPI } from '@/hooks/useTinyCamAPI';
import { EventRecord } from '@/types/tinycam';
import { useAppContext } from '@/context/AppContext';

const EventList = () => {
  const { server, login, selectedCamera } = useAppContext();

  // The API hook is now initialized with state from the context.
  const api = useTinyCamAPI(server!, login!);

  const [events, setEvents] = useState<EventRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!server || !login || !selectedCamera) {
      setEvents([]);
      return;
    }

    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const eventList = await api.getEventList(
          selectedCamera.id,
          Date.now(),
          50, // Fetch last 50 events
          'local',
          ''
        );
        setEvents(eventList);
      } catch (err) {
        setError('Failed to fetch events.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [api, server, login, selectedCamera]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">Events for {selectedCamera ? selectedCamera.name : '...'}</h2>

      {!selectedCamera && <p className="text-yellow-400">Select a camera to see its events.</p>}

      {isLoading && <p className="text-white">Loading events...</p>}

      {error && <p className="text-red-500">{error}</p>}

      { !isLoading && !error && (
        <ul className="space-y-2 h-96 overflow-y-auto">
          {events.length > 0 ? (
            events.map((event) => (
              <li key={event.time} className="bg-gray-700 p-3 rounded-lg">
                <p className="text-white font-semibold">
                  {new Date(event.time).toLocaleString()} - {event.motion}
                </p>
                <p className="text-sm text-gray-400">Duration: {event.duration / 1000}s</p>
                <p className="text-sm text-blue-400 truncate" title={event.video}>
                  {event.video}
                </p>
              </li>
            ))
          ) : (
            <p className="text-white">No events found for this camera.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default EventList;
