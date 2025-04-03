import React, { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { wsService, WebSocketStatus } from '../services/websocket';

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wsStatus, setWsStatus] = useState<WebSocketStatus>('DISCONNECTED');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const subscription = wsService.status$.subscribe(setWsStatus);
    
    if (isOnline) {
      wsService.connect();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      subscription.unsubscribe();
      wsService.disconnect();
    };
  }, [isOnline]);

  if (!isOnline) {
    return (
      <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-4 flex items-center justify-center space-x-2">
        <WifiOff className="h-5 w-5" />
        <span>You are offline. Please check your internet connection.</span>
      </div>
    );
  }

  return (
    <div className={`fixed top-0 left-0 w-full p-4 flex items-center justify-center space-x-2 ${
      wsStatus === 'CONNECTED' ? 'bg-green-500' : 'bg-yellow-500'
    } text-white`}>
      <Wifi className="h-5 w-5" />
      <span>
        {wsStatus === 'CONNECTED' && 'Connected to server'}
        {wsStatus === 'CONNECTING' && 'Connecting to server...'}
        {wsStatus === 'RECONNECTING' && 'Attempting to reconnect...'}
        {wsStatus === 'DISCONNECTED' && 'Failed to connect to server'}
      </span>
    </div>
  );
}