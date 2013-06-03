/*global require __dirname console */


var express = require('express'),
	stylus = require('stylus'),
	nib = require('nib'),
//	db_connection = require('./modules/db_connection.js'),
	auth = require('./modules/auth'),
    controller = require('./modules/controller');
   
   

var app = express();
function compile(str, path){
	return stylus(str).set('filename',path).use(nib());
}

app.set('views', __dirname + '/views'); //Establece el directorio views al directorio de app.js + views. P. ej: Si /home/aimar/development/app.js --> /home/aimar/development/views
app.set('view engine', 'jade'); //Establece jade (Motor de plantillas similar a haml de ruby) como el motor de plantillas. Estas plantillas van en views
app.use(express.logger('dev'));

app.use(express.static(__dirname + '/public')); //Se accede estaticamente mediante url a contenidos en /public, por ejemplo con la url /images/ex1/jpg se accede a carpeta_web/public/images/ex1.jpg

app.use(express.cookieParser());
app.use(express.session({secret: "Just a key to be hashed" }));

app.get(/^\/(login)?$/, function(req, res) {
    if(req.session.logged){
        controller.render_homepage(req, res);
    } else {
        controller.render_login(res);
    }
});

app.get('/auth', function(req, res){
    req.session.logged = true;
    req.session.user = req.query.user;
    controller.render_homepage(req, res);
});


app.get('/register', function(req, res) {
	auth.check('aimar', res);
});

app.get('/resync/:name', function(req, res){
	res.send("Resyncronization for user with name: " + req.params.name);	
});

app.listen(8080);