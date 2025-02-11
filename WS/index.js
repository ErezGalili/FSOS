const express = require('express');
const {WebSocketServer} = require('ws');
const app = express();
const wss = new WebSocketServer({port: 5050});

const connections = new Set();

setInterval(() => {
    const randomNumber = Math.random();
    connections.forEach(ws => {
        ws.send(JSON.stringify({ type: 'graph', data: randomNumber }));
    });
}, 800);

wss.on('connection', (ws) => {
    connections.add(ws);
    console.log('Client connected');
    
    ws.on('close', () => {
        console.log('Client disconnected');
        connections.delete(ws);
    });
    
    ws.on('error', () => {
        console.log('Client error');
        connections.delete(ws);
    });

    ws.on('message', (msg) => {
        msg = msg.toString();
        console.log(`Received message: ${msg}`);
        const l = msg.length;
        const startWithDigit = !isNaN(msg[0]);
        const endWithDigit = !isNaN(msg[l - 1]);
        const response = `You sent a message of length ${l} that ${startWithDigit ? 'starts' : 'does not start'} with a digit and ${endWithDigit ? 'ends' : 'does not end'} with a digit`;
        ws.send(JSON.stringify({ type: 'msg', data: response }));
        
        wss.clients.forEach((client) => {
            if (client !== ws) {
                client.send(JSON.stringify({ type: 'msg', data: msg }));
            }
        });
    });
});

app.use(express.static('./public'));

app.listen(5000, () => {
    console.log('App listening on port 5000');
});