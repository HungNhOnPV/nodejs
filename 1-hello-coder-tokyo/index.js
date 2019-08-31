var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

db =low(adapter);

db.defaults({
	users: []
}).write();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res) {
	res.render('index', {
		name:'AAA'
	});
});

app.get('/users', function(req, res) {
	res.render('users/index', {
		users: db.get('users').value()
	});
});

app.get('/users/search', function(req, res) {
	var q = req.query.q;
	var matchedUsers = users.filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	
	res.render('users/index', {
		users: matchedUsers
	});
});

app.get('/users/create', function(req, res) {
	res.render('users/create');
});

app.post('/users/create', function(req, res) {
	db.get('users').push(req.body).write();
	res.redirect('/users');
})

app.listen(3000, function() {
	console.log('Server listening on port ' + port);
});