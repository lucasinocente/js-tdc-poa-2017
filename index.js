var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res) {
  res.send('Hello TDC');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on http://localhost:' + app.get('port'));
});