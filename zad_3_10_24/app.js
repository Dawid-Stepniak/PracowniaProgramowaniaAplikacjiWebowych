const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


const getMimeType = (ext) => {
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.txt': 'text/plain',
    };
    return mimeTypes[ext] || 'application/octet-stream';
};


app.get('/', (req, res) => {
    res.status(200).send('Strona główna');
});


app.get('/json', (req, res) => {
    res.status(200).json({ message: 'To jest dokument JSON', status: 'success' });
});


app.get('/html-generated', (req, res) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Wygenerowany dokument HTML</title>
        </head>
        <body>
            <h1>dokument HTML generowany wewnątrz kodu Node.js</h1>
        </body>
        </html>
    `;
    res.status(200).send(htmlContent);
});


app.get('/html-file', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Błąd przy odczycie pliku HTML:', err);
            res.status(500).send('Błąd przy odczycie pliku HTML');
        }
    });
});


app.get('/get_params', (req, res) => {
    const params = req.query;
    console.log('Otrzymane parametry:', params);

    const timestamp = Date.now();
    const filePath = path.join(__dirname, `params_${timestamp}.json`);

    fs.writeFile(filePath, JSON.stringify(params, null, 2), (err) => {
        if (err) {
            console.error('Błąd zapisu pliku:', err);
            res.status(500).json({ error: 'Nie udało się zapisać pliku' });
            return;
        }
        console.log(`Parametry zapisane w pliku: ${filePath}`);
        res.status(200).json({ ok: 'ok' });
    });
});


app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'assets', req.path);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).json({ error: 'Nie znaleziono pliku' });
        } else {
            const ext = path.extname(filePath);
            const mimeType = getMimeType(ext);

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.error('Błąd przy odczycie pliku:', err);
                    res.status(500).json({ error: 'Błąd przy odczycie pliku' });
                } else {
                    res.status(200).contentType(mimeType).send(data);
                }
            });
        }
    });
});


app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT} -> http://localhost:3000/\n
    http://localhost:3000/
    http://localhost:3000/json
    http://localhost:3000/html-generated
    http://localhost:3000/html-file
    http://localhost:3000/get_params?name=Adam&age=25
    http://localhost:3000/example.html`);
});