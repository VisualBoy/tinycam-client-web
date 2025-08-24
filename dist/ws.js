"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var wss = new ws_1.WebSocketServer({ port: 8081 });
wss.on('connection', function connection(ws) {
    console.log('A new client connected');
    ws.on('message', function message(data) {
        console.log('received: %s', data);
        // Echo the message back to the client
        ws.send(data);
    });
    ws.on('close', function () {
        console.log('Client disconnected');
    });
    ws.send('Welcome to the WebSocket server!');
});
console.log('WebSocket server is running on ws://localhost:8081');
