var mysql = require('./db_connection');
var auth = require('./auth');

module.exports.render_login = function(res){    
    res.render('login',
	{ title: 'Sign in' }
	);
};

module.exports.render_homepage = function(req, res){
    mysql.user_homepage(req, res);
};

module.exports.render_resync = function(req, res){
    res.render('resync',
    { name: req.session.user, title: 'Resyncronization' }
    );
};

module.exports.render_register = function(res){
    res.render('register',
    { title: 'Register' }
    );
};

module.exports.store_user = function(req, res){
    var name = req.query.user,
        pass = req.query.pass,
        seed = random_string(),
        sequence_number = Math.floor(Math.random()*500) + 200;
        mysql.store_user(name, pass, seed, sequence_number, req, res);
};

module.exports.authenticate = function(req, res){
    var user = req.query.user,
        key = req.query.key;
    auth.check(user, key, req, res); 
};

module.exports.render_error = function(res, msg){
    res.render('error',
    { error : msg, title : "error" }
    );
}

var random_string = function(){
    var chars = "abcdefghijklmnopqrstuvwxyz";
    var len = chars.length;
    var strlen = Math.floor(Math.random()*4) + 4;
    var str = "";
    
    for(var i = 0; i < strlen; i++){
        var rnum = Math.floor(Math.random() * len);
        str += chars.substring(rnum,rnum+1);
    }
    
    return str;
};