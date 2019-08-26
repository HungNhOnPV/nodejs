var express = require('express');
var app = express();
var port = 3000;

app.get('/', function(request, response) {
	response.send('<h1>Hello Coders.Tokyo<h1>');
});

app.get('/User', function(request, response) {
	response.send('User list');
});

app.listen(3000, function() {
	console.log('Server listening on port ' + port);
});