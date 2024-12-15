const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    const path = req.url;
    if(path === "/")
        res.write("Welcome");
    else if(path === "/firstname")
        res.write("Miki");
    else if (path === "/lastname")
        res.write("Mini");
    else
        res.write("404")
    res.end();
});

server.listen(3000);