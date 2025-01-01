var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../db'); // Import połączenia z bazą danych

const viewsPath = path.join(__dirname, '../public/views');


router.get('/', function(req, res) {
  res.sendFile(path.join(viewsPath, 'index.html'));
});


router.get('/o-nas', function(req, res) {
  res.sendFile(path.join(viewsPath, 'about.html'));
});


router.get('/oferta', function(req, res) {
  res.sendFile(path.join(viewsPath, 'offer.html'));
});


router.get('/kontakt', function(req, res) {
  res.sendFile(path.join(viewsPath, 'contact.html'));
});


router.post('/kontakt', (req, res) => {
  const { imie, nazwisko, email, tresc } = req.body;

  if (!imie || !nazwisko || !email || !tresc) {
    return res.status(400).send('Brakuje danych formularza');
  }

  const query = `INSERT INTO messages (imie, nazwisko, email, tresc) VALUES (?, ?, ?, ?)`;
  db.query(query, [imie, nazwisko, email, tresc], (err, result) => {
    if (err) {
      console.error('Błąd zapisu do bazy danych:', err);
      return res.status(500).send('Błąd serwera');
    }
    console.log(`Wiadomość zapisana, ID: ${result.insertId}`);
    res.redirect('/');
  });
});


router.get('/api/contact-messages', (req, res) => {
  const query = `SELECT * FROM messages`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Błąd pobierania wiadomości:', err);
      return res.status(500).send('Błąd serwera');
    }
    res.json(results);
  });
});

router.get('/api/contact-messages/:id', (req, res) => {
  const messageId = req.params.id;
  const query = `SELECT * FROM messages WHERE id = ?`;
  db.query(query, [messageId], (err, results) => {
    if (err) {
      console.error('Błąd pobierania wiadomości:', err);
      return res.status(500).send('Błąd serwera');
    }
    if (results.length === 0) {
      return res.status(404).send('Wiadomość o podanym ID nie istnieje');
    }
    res.json(results[0]);
  });
});

module.exports = router;
