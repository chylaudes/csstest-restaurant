var express = require('express');
var fs = require('fs');
var glob = require('glob');
var path = require('path');

var app = express();

//serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.get('/', function(req, res) {
  res.sendFile(__dirname +'/index.html', function(err){
    if (err) {
      res.status(500).send(err);
    }
  });
});


app.listen(3000, function () {
  console.log('fs-ac server is running at http://localhost:3000/');
});
