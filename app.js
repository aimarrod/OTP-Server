var express = require('express'),
	stylus = require('stylus'),
	nib = require('nib');

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

app.get('/', function(req, res) {
	res.render('login',
	{ title: 'Home' }
	);
});

app.listen(3000);