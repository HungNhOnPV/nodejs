var db = require('../db');
var shortid = require('shortid');

module.exports.login = function(req, res) {
	res.render('auth/login');
};

module.exports.postLogin = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({ email: email}).value();

	if(!user) {
		res.render('auth/login', {
			errors: [
			"User dose not exist!"
			],
			values: req.body
		});
		return;
	}

	if(user.password !== password) {
		res.render('auth/login', {
			errors: [
			"Wrong password!"
			],
			values: req.body
		});
		return;
	}

	res.cookie("userId", user.id);
	res.redirect('/users');
};