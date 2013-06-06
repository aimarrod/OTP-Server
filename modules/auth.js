/*global require exports module console */



var controller = require('./controller'),
    net = require('net'),
    db = require('./db_connection'),
    auth_port = 7777;

module.exports.check = function(user, key, req, res){
	
    db.get_user(user, res, function(user){
        if(key == "" || key == undefined){
            controller.render_error(res, "Input a password");
        }
    
        var client = net.connect(auth_port, 'localhost');
    
        client.write(user.seed + "," + user.sequence_numbr + "\n");
    
        client.on('data',function(data){
            if(key == data){
                req.session.user = user.name;
                req.session.logged = true;
                req.session.throttling = 0;
                res.redirect("/");
            } else {
                if(req.session.throttling){
                    req.session.throttling += 1;   
                } else {
                    req.session.throttling = 1;
                }
                controller.render_error(res, "Wrong password, remaining attemps: " + (3 - req.session.throttling));
            }        
        });
    
        client.on('error', function(){
            controller.render_error(res, "Error connecting to the auth server");    
        });
    
        client.on('timeout', function(){
            controller.render_error("Timeout with the authentication server");
        });
    });
    
};