const app = document.getElementById('app');
const input = document.getElementById('input');
const send = document.getElementById('send');
const graph = document.getElementById('graph');
let num = 0;
const pushMsg = (msg, internal=false) => {
    const div = document.createElement('div');
    div.innerHTML = msg;
    if (internal) {
        div.style.textAlign = 'center';
        div.style.backgroundColor = 'darkblue';
        div.style.fontStyle = 'italic';
    }
    app.appendChild(div);
}

const pushGraph = (r) => {
    const height = Math.ceil(r*300)
    const div = document.createElement('div');
    div.style.height = `${height}px`;
    if (height < num) div.style.backgroundColor = 'red';
    graph.appendChild(div);
    num = height;
}

const ws = new WebSocket('ws://localhost:5050');
ws.addEventListener('open', () => {pushMsg('Connected to server', true);});
ws.addEventListener('close', () => {pushMsg('Disconnected from server', true);});
ws.addEventListener('error', () => {pushMsg('Error connecting to server', true);});
ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'msg') {
        pushMsg(message.data);
    } else if (message.type === 'graph') {
        pushGraph(message.data);
    }
});
send.addEventListener('click', () => {
    const msg = input.value;
    if (!msg) return;
    ws.send(msg);
    pushMsg(msg, true);
    input.value = '';
});