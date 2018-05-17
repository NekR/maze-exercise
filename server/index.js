var path = require('path');

var express = require('express');
var app = express();

var WWW_FOLDER = path.join(__dirname, '../dist');

app.get('/', serveIndex);

app.use(express.static(WWW_FOLDER));

app.get('/*', serveIndex);

app.listen(process.env.PORT || 9999);

function serveIndex(req, res) {
  res.sendFile(path.join(WWW_FOLDER, 'index.html'), {
    cacheControl: false,
    acceptRanges: false,
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
}