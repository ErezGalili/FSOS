const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("My name is Elick Belick");
    res.end();
});

server.listen(3000);