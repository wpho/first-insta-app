var express = require('express')

var app = express()
var port = 3000

app.set('view engine', 'ejs');

//app.get('/', (req, res) => res.send('Hello World!') )

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port, function() { 
    console.log('Example app listening on port 3000')
});