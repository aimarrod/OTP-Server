/*global require exports module console */

var crypto = require('crypto'),
	db = require('./db_connection');

module.exports.check = function(user, res){
	db.get_user(user, res, function(user, res){
		//Generate hmac and all the process.
		console.log(user);
		var hc = crypto.createHmac('sha1', user.passphrase).update(user.counter).digest('hex');
		hex = [];
		//Transform into hexadecimal
		for (var i = 0; i < hc.length; i += 2) {
		    hex.push("0x" + hc.substr(i, 2));
		}
		//Metodo de truncado
		offset = hex[hex.length-1];
		offset = parseInt(offset,16);		
		var base = (parseInt(hex[offeset], 16) + parseInt(hex[offeset+1], 16) + parseInt(hex[offeset+2], 16) + parseInt(hex[offeset+3], 16)).toString(16);
  		base = base & 0x7f;
  		base = parseInt(base.substr(2), 16);
		res.end(base % (10**digit));
	});
};