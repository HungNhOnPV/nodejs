var shorid = require('shortid');

var db = require('../db');

module.exports = function(req, res, next) {
	if(!req.signedCookies.sessionId) {
		var sessionId = shorid.generate()
		res.cookie('sessionId', sessionId, {
			signed: true
		});

		db.get('sessions').push({
			id: sessionId
		}).write();
	}

	next();
}