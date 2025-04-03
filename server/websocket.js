/* This code snippet is setting up a WebSocket server using the `ws` library in a Node.js environment.
Here's a breakdown of what each part is doing: */
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    if (message.toString() === 'ping') {
      ws.send('pong');
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});