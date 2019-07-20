const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');

app.use(express.static('public'));
app.use('/api', proxy({ target: 'http://localhost:3000' }));

app.listen(8000, function () {
  console.log('UI started on port 8000');
});