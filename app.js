var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');

const PORT = process.env.PORT || 5000;

var app = express()

app.set('view engine', 'ejs');
app.set('port', PORT);

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/media', function(req, res) {
    var code = req.query.code;
    axios
        .post('https://api.instagram.com/oauth/access_token', {
            client_id: '857858091290618',
            client_secret: '8b8d3e34c9a83747d4684915d52c3ba9',
            grant_type: 'authorization_code',
            redirect_uri: 'https://wpho-test-app.herokuapp.com/media',
            code: code
        })
        .then(res => {
            console.log('access token: ' + res.access_token)
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })

    res.render('media', {code: code});
});

app.listen(PORT, function() { 
    console.log('Example app listening on port 5000')
});