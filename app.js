/*global require __dirname console */

 
// ESTAN TODAS LAS URL CREO. EN PRINCIPIO DESDE LOS GET SOLO SE DEBERIA
// LLAMAR AL CONTROLLER.


var express = require('express'),
	stylus = require('stylus'),
	nib = require('nib'),
    controller = require('./modules/controller');
   
   

var app = express();
function compile(str, path){
	return stylus(str).set('filename',path).use(nib());
}

app.set('views', __dirname + '/views'); 
app.set('view engine', 'jade'); 
app.use(express.logger('dev'));

app.use(express.static(__dirname + '/public')); 

app.use(express.cookieParser());
app.use(express.session(
        {secret: "Just a key to be hashed" 
        , cookie: { 
            maxAge: 30 * 1000 
        }
      }));

app.get(/^\/(login)?$/, function(req, res) {
    if(req.session.throttling > 2){
        controller.render_error(res, "Too many failed attepms");    
    } else if(req.session.logged){
        req.session.logged = true;
        req.session.user = req.session.user;
        controller.render_homepage(req, res);
    } else {
        controller.render_login(res);
    }
});

app.get(/resync/, function(req, res) {
    if(req.session.throttling > 2){
        controller.render_error(res, "Too many failed attepms");    
    } else if(req.session.logged){
        controller.render_resync(req, res);
        req.session.logged = true;
        req.session.user = req.session.user;
    } else {
        res.redirect("/");
    }
});

app.get(/auth/, function(req, res){
    if(req.session.throttling > 2){
        controller.render_error(res, "Too many failed attepms");    
    } else {req.session.user = req.query.user;
        controller.authenticate(req,res);
    }
});


app.get(/register/, function(req, res) {
	if(req.session.throttling > 2){
        console.log(req.session.throttling);
        controller.render_error(res, "Too many failed attepms");    
    } else if(req.session.logged){
        req.session.logged = true;
        req.session.user = req.session.user;
        res.redirect("/");
	} else {
        controller.render_register(res);   
	}
});

app.get(/store/, function(req, res){
    if(req.session.throttling > 2){
        controller.render_error(res, "Too many failed attepms");    
    } else if(req.session.logged){
        req.session.logged = true;
        req.session.user = req.session.user;
        res.redirect("/");
    } else {
        controller.store_user(req, res);
    }
});

app.get(/logout/, function(req, res){
    req.session.logged = false;
    res.redirect("/");
});

app.get(/res/, function(req, res){
    if(req.session.throttling > 2){
        controller.render_error(res, "Too many failed attepms");    
    } else if(req.session.logged){
        req.session.logged = true;
        req.session.user = req.session.user;
        controller.change_seed(req, res);
    } else {
        controller.redirect("/");
    }
});


app.listen(8080);