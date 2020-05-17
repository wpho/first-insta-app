var express = require('express');
const PORT = process.env.PORT || 5000;

var app = express()

app.set('view engine', 'ejs');
app.set('port', PORT);

//app.get('/', (req, res) => res.send('Hello World!') )

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(PORT, function() { 
    console.log('Example app listening on port 5000')
});