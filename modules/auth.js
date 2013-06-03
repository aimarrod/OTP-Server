/*global require exports module console */

var crypto = require('crypto'),
	db = require('./db_connection');

module.exports.check = function(user, res){
	db.get_user(user, res, function(user, res){
		//Generate hmac and all the process.
		console.log(user);
		var hc = crypto.createHmac('sha1', user.passphrase).update(user.counter).digest('hex');
		res.end(hc);
	});
};