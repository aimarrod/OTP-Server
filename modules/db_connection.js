/*global require console exports module */

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

connection.connect();

connection.query('use otp', function(err){
	if(err){
		console.log(err);	
	} else {
		console.log('connected to DB otp');
	}
});

module.exports.get_user = function(name, callback){
	var patt = /^[a-z0-9]+$/;
	if(patt.test(name)){
		connection.query('SELECT * FROM users WHERE name = ?' ,name, function(err, results){
			if(err){
				console.log(err);
				callback(err);
			} else {
				callback(results[0].name);
			}
		});	
	}
	return patt.test(name);
};


