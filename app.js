var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var request = require('request');

const PORT = process.env.PORT || 5000;

var app = express()

app.set('view engine', 'ejs');
app.set('port', PORT);

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/media', function(req, globalResponse) {
    var options = { method: 'POST',
                    url: 'https://api.instagram.com/oauth/access_token',
                    headers: 
                    { 
                        'cache-control': 'no-cache',
                        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
                    formData: 
                    { client_id: '857858091290618',
                        client_secret: '8b8d3e34c9a83747d4684915d52c3ba9',
                        grant_type: 'authorization_code',
                        redirect_uri: 'https://wpho-test-app.herokuapp.com/media',
                        code: req.query.code }
    };

     request(options, function (error, response, body) {
        var imageUrl;
        if (error) throw new Error(error);
        var bodyObject = JSON.parse(body);
        console.log('get access token: ' + bodyObject.access_token);
        var get_options = { method: 'GET',
                        url: 'https://graph.instagram.com/me/media',
                        qs: 
                        { fields: 'id,caption',
                            access_token: bodyObject.access_token },
                        headers: 
                        {'cache-control': 'no-cache' }
        };

        request(get_options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(JSON.parse(body).data[0].id);
            var options = { method: 'GET',
                            url: 'https://graph.instagram.com/' + JSON.parse(body).data[0].id,
                            qs: 
                            { fields: 'id,media_type,media_url,username,timestamp',
                                access_token:  bodyObject.access_token},
                            headers: 
                            { 'cache-control': 'no-cache' } 
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                imageUrl = JSON.parse(body).media_url;
                
                console.log(body);
                globalResponse.render('media', {imageUrl: JSON.parse(body).media_url});
                

            });
        });

      });
    
    
      

});

app.listen(PORT, function() { 
    console.log('Example app listening on port 5000')
});

