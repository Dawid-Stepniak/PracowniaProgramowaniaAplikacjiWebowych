const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Pomocnicza funkcja do określenia typu MIME na podstawie rozszerzenia pliku
const getMimeType = (ext) => {
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.txt': 'text/plain'
    };
    return mimeTypes[ext] || 'application/octet-stream';
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

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
    } else if (req.url.startsWith('/get_params')) {
        const params = parsedUrl.query;
        console.log('Otrzymane parametry:', params);

        const timestamp = Date.now();
        const filePath = path.join(__dirname, `params_${timestamp}.json`);

        fs.writeFile(filePath, JSON.stringify(params, null, 2), (err) => {
            if (err) {
                console.error('Błąd zapisu pliku:', err);
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Nie udało się zapisać pliku' }));
                return;
            }
            console.log(`Parametry zapisane w pliku: ${filePath}`);
        });

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: 'ok' }));
    } else {
        const filePath = path.join(__dirname, 'assets', parsedUrl.pathname);

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Nie znaleziono pliku' }));
            }
            else {
                const ext = path.extname(filePath);
                const mimeType = getMimeType(ext);

                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({ error: 'Błąd przy odczycie pliku' }));
                    }
                    else {
                        res.writeHead(200, { 'Content-Type': mimeType });
                        res.end(data);
                    }
                });
            }
        });
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT} -> http://localhost:3000/\n
    http://localhost:3000/
    http://localhost:3000/json
    http://localhost:3000/html-generated
    http://localhost:3000/html-file
    http://localhost:3000/get_params?name=Adam&age=25
    http://localhost:3000/kot.jpg`);
});