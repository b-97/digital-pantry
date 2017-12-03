// Digital Pantry Server Side JavaScript

// Node Modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('client-sessions');
app.use(session({
	cookieName: 'digital-pantry',
	secret: 'abc123dorame',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000
}));

// Custom Modules
var page_manager = require('./controllers/page_manager');
var table_manager = require('./controllers/table_manager');
//var database = require('./controllers/database');
//var db = new database.Database();

app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(8080, function() {
	console.log("...Server Started...");
});

app.post('/login', function(req, res) {
	db.once('loggedin', function(msg) {
		if (msg == 1) {
			req.session.userid = req.body.username;
			return "Logged in successfully!";
		}
		else {
			return "Error during login.";
		}
	});
	db.login(req.body.username, req.body.password);
});

app.get('/logout', function (req, res) {
	req.session.reset();
	return res.redirect('/');
});

/*
	/homepage, /view_ingredients_page, /add_ingredients_page,
	/view_recipes_page, /add_recipes_page are all GET requests
	that simply load the HTML data for a particular page.
*/
app.get('/homepage', function(req, res) {
	res.send(page_manager.renderHomePage());
});
app.get('/view_ingredients_page', function(req, res) {
	res.send(page_manager.renderViewIngredientsPage());
});
app.get('/add_ingredients_page', function(req, res) {
	res.send(page_manager.renderAddIngredientsPage());
});
app.get('/view_recipes_page', function(req, res) {
	res.send(page_manager.renderViewRecipesPage());
});
app.get('/add_recipes_page', function(req, res) {
	res.send(page_manager.renderCreateRecipePage());
});


app.post('/ingredients_table', function(req, res) {
	
});

app.post('/recipes_table', function(req, res) {
	
});