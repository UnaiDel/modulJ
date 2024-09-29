import { useEffect, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useWebSocket = () => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        ws.current = new WebSocket('ws://<your-backend-ip>:<port>');

        ws.current.onopen = () => {
          console.log('WebSocket connection opened');
          ws.current?.send(JSON.stringify({ type: 'ping' }));
        };

        ws.current.onmessage = (event) => {
          console.log('Message from server', event.data);
          // Lógica para manejar los mensajes recibidos del backend
        };

        ws.current.onclose = () => {
          console.log('WebSocket connection closed');
        };

        ws.current.onerror = (error) => {
          console.error('WebSocket error', error);
        };
      }
    });

    return () => {
      ws.current?.close();
    };
  }, []);
};
