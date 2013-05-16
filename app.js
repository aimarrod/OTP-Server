/*global require __dirname console */


var express = require('express'),
	stylus = require('stylus'),
	nib = require('nib'),
	db_connection = require('./modules/db_connection.js');


var app = express();
function compile(str, path){
	return stylus(str).set('filename',path).use(nib());
}

app.set('views', __dirname + '/views'); //Establece el directorio views al directorio de app.js + views. P. ej: Si /home/aimar/development/app.js --> /home/aimar/development/views
app.set('view engine', 'jade'); //Establece jade (Motor de plantillas similar a haml de ruby) como el motor de plantillas. Estas plantillas van en views
app.use(express.logger('dev'));
app.use(stylus.middleware(
	{ src: __dirname + '/public',
	compile: compile
	}
));
app.use(express.static(__dirname + '/public')); //Se accede estaticamente mediante url a contenidos en /public, por ejemplo con la url /images/ex1/jpg se accede a carpeta_web/public/images/ex1.jpg

app.get('/login', function(req, res) {
	res.render('login',
	{ title: 'Home' }
	);
});

app.get('/auth', function(req, res){
  	var key = req.query["key"];
	var user = req.query["user"];
	res.send("name is " + user + " and key is " + key);
	//seguir la autenticacion
});


app.get('/register', function(req, res) {
	db_connection.get_user('aimar', function(username){
		res.send(username);
	});
});

app.get('/resync/:name', function(req, res){
	res.send("Resyncronization for user with name: " + req.params.name);	
});

app.listen(3000);