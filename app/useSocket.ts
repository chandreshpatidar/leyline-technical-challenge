'use client'; // Directive for client-side code, this indicates that, code will run on client side

import { useEffect } from 'react';
import { socket } from './socket';

// Custom hook to manage socket connection
export function useSocket() {
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      // Logic to handle connection
    }

    function onDisconnect() {
      // Logic to handle disconnection
    }

    // Set up event listeners for socket connection and disconnection
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Cleanup function to remove event listeners on unmount
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []); // Run effect only once on mount

  return null;
}
