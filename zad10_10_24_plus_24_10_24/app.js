var express = require('express');
var path = require('path');
var db = require('./db');

var indexRouter = require('./routes/index');

var app = express();


app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({ extended: true }));


app.use('/', indexRouter);


app.listen(3001, () => {
  console.log('Server is running on http://localhost:3000');
});

module.exports = app;