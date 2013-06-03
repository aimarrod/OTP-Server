module.exports.render_login = function(res){    
    res.render('login',
	{ title: 'Sign in' }
	);
};

module.exports.render_homepage = function(req, res){
    res.render('homepage',
    { name: req.session.user, title: 'Home' }
    );
};