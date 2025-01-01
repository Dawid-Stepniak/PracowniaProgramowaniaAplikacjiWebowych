const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Strona główna');
    } else if (req.url === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'To jest dokument JSON', status: 'success' }));
    } else if (req.url === '/html-generated') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Wygenerowany dokument HTML</title>
            </head>
            <body>
                <h1>dokument HTML generowany wewnątrz kodu Node.js</h1>
            </body>
            </html>
        `);
    } else if (req.url === '/html-file') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Błąd przy odczycie pliku HTML');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Nie znaleziono strony');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT} -> http://localhost:3000/\n
    http://localhost:3000/
    http://localhost:3000/json
    http://localhost:3000/html-generated
    http://localhost:3000/html-file`);

});