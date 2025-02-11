const express = require('express');
const {WebSocketServer} = require('ws');
const app = express();
const wss = new WebSocketServer({port: 5050});

const connections = new Set();

setInterval(() => {
    const randomNumber = Math.random();
    connections.forEach((ws) => {
        ws.send(JSON.stringify({ type: 'graph', data: randomNumber }));
    });
}, 800);

wss.on('connection', (ws) => {
    connections.add(ws);
    console.log('Client connected');
    
    ws.on('message', (rawMsg) => {
        const msg = JSON.parse(rawMsg.toString());
        if (msg.type === 'chat') {
            connections.forEach(client => {
                if (client.readyState === client.OPEN) {
                    client.send(JSON.stringify({
                        type: 'msg',
                        username: msg.username,
                        data: msg.message
                    }));
                }
            });
        } else if (msg.type === 'nameChange') {
            connections.forEach(client => {
                if (client.readyState === client.OPEN) {
                    client.send(JSON.stringify({
                        type: 'system',
                        data: `${msg.oldUsername} changed their name to ${msg.newUsername}`
                    }));
                }
            });
        }
    });

    ws.on('close', () => {
        connections.delete(ws);
        console.log('Client disconnected');
    });

    ws.on('error', () => {
        connections.delete(ws);
        console.log('Client error');
    });
});

app.use(express.static('./public'));

app.listen(5000, () => {
    console.log('App listening on port 5000');
});