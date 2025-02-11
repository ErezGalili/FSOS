const app = document.getElementById('app');
const input = document.getElementById('input');
const send = document.getElementById('send');
const graph = document.getElementById('graph');
const usernameInput = document.getElementById('username');
let num = 0;
let username = 'Anonymous';

const pushMsg = (msg, internal=false, sender='') => {
    const div = document.createElement('div');
    div.innerHTML = sender ? `${sender}: ${msg}` : msg;
    if (internal) {
        div.style.textAlign = 'center';
        div.style.backgroundColor = 'darkblue';
        div.style.fontStyle = 'italic';
    }
    app.appendChild(div);
}

const pushGraph = (r) => {
    const height = Math.ceil(r*300);
    const div = document.createElement('div');
    div.style.height = `${height}px`;
    if (height < num) div.style.backgroundColor = 'red';
    graph.appendChild(div);
    num = height;
}

const ws = new WebSocket('ws://localhost:5050');

ws.addEventListener('open', () => pushMsg('Connected to server', true));
ws.addEventListener('close', () => pushMsg('Disconnected from server', true));
ws.addEventListener('error', () => pushMsg('Error connecting to server', true));

usernameInput.addEventListener('change', () => {
    const newUsername = usernameInput.value.trim() || 'Anonymous';
    ws.send(JSON.stringify({ 
        type: 'nameChange',
        oldUsername: username || 'Anonymous',
        newUsername: newUsername
    }));
    username = newUsername;
    pushMsg(`Your name is set to: ${username}`, true);
});

// Add enter key support for input
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
        send.click();
    }
});

ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'msg') {
        pushMsg(message.data, false, message.username || 'Anonymous');
    } else if (message.type === 'graph') {
        pushGraph(message.data);
    }
});

send.addEventListener('click', () => {
    const msg = input.value;
    if (!msg) return;
    const username = usernameInput.value.trim() || 'Anonymous';
    ws.send(JSON.stringify({ 
        type: 'chat',
        message: msg,
        username: username
    }));
    input.value = '';
});

