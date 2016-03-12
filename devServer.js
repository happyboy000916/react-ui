'use strict';

var path = require('path');
var express = require('express');
var webpack = require('webpack');

var config = require("./webpack.config.dev.js");

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/'
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/dist', express.static('docs/dist'));
app.use('/images', express.static('docs/src/images'));
app.use('/lib', express.static('docs/lib'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'docs/src/index.html'));
});

app.get('/form.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'standalone/form/index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
