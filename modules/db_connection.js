/*global require console exports module */

var mysql = require('mysql'),
    controller = require('./controller.js');

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

module.exports.store_user = function(name, password, seed, sequence_number, req, res){
    var patt = /^[a-z0-9]+$/;
    
    if(patt.test(name) && password.length > 8){
        connection.query('INSERT INTO users VALUES(?, ?, ?, ?)', [name, password, seed, sequence_number], function(err){
            if(err){
                console.log(err);
                controller.render_error(res, "Database error");
            } else {
                req.session.logged = true;
                req.session.user = name;
                res.redirect("/");
            }
        });
        
    } else {
        controller.render_error(res, "Invalid user or password");
    }
};

module.exports.get_user = function(name, res, callback){
	var patt = /^[a-z0-9]+$/;

	if(patt.test(name)){
		connection.query('SELECT * FROM users WHERE name = ?' ,name, function(err, results){
			if(err){
				console.log(err);
				controller.render_error(res, "Database error");
            } else {
                if(results.length > 0){
				    callback(results[0]);
                } else {
                    controller.render_error(res, "Wrong username");
                }
			}
		});	
	}
};

module.exports.decrement = function(name, res){
    connection.query('UPDATE otp.users SET sequence_number=(SELECT sequence_number FROM (SELECT * FROM users where name = ?) AS x)-1 WHERE name = ?' ,[name, name], function(err){
        if(err){
            console.log("Error updating sequence number");
            console.log(err);
            res.redirect('/resync');
        } else {
            res.redirect("/");    
        }
    });
};

module.exports.change_seed = function(name, seq, seed, res){
    connection.query('UPDATE otp.users SET seed=?,sequence_number=? WHERE name = ?' ,[seed, seq, name], function(err){
        if(err){
            console.log("Error updating seed");
            console.log(err);
            controller.render_error(res, "Unable to update seed");
        } else {
            res.redirect("/");    
        }
    });
};

module.exports.user_homepage = function(req, res){
    connection.query('SELECT * FROM users WHERE name = ?' ,req.session.user, function(err, results){
    	if(err){
			console.log(err);
			controller.render_error(res, "Database error");
        } else {
            var user = results[0];
            res.render('homepage',
            { name: user.name, sequence: user.sequence_number, seed: user.seed, title: 'Home' }
            );
		}
	});	
}
	
module.exports.close = function(err){
	connection.end(function(err){
		console.log(err);
	});
};


