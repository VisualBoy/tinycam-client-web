import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', function connection(ws) {
  console.log('A new client connected');

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    // Echo the message back to the client
    ws.send(data);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.send('Welcome to the WebSocket server!');
});

console.log('WebSocket server is running on ws://localhost:8081');
