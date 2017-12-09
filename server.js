// Digital Pantry Server Side JavaScript

// Node Modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('client-sessions');

// Custom Modules
var page_manager = require('./controllers/page_manager');
var table_manager = require('./controllers/table_manager');
var db = new table_manager;

app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(8080, function() {
	console.log("...Server Started...");
});

app.post('/login', function(req, res) {
	db.once('auth', function(msg) {
		if (msg) {
			res.send("Logged in as " + req.body.username);
		}
		else {
			res.send(msg);
		}
	});
	db.authenticate(req.body.username, req.body.password);
});

app.get('/logout', function (req, res) {
	req.session.reset();
	return res.redirect('/');
});5

/*
	/homepage, /view_ingredients_page, /add_ingredients_page,
	/view_recipes_page, /add_recipes_page are all GET requests
	that simply load the HTML data for a particular page.
*/
app.get('/welcome_page', function(req, res) {
	res.send(page_manager.renderWelcomePage());
});
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
app.get('/panel_logged_in', function(req, res) {
	res.send(page_manager.renderPanelLoggedIn());
});
app.get('/panel_logged_out', function(req, res) {
	res.send(page_manager.renderPanelLoggedOut());
});
app.get('/full_pantry_table', function(req, res) {
	db.once('db_get_response_success', function(msg) {
		res.send(msg);
		console.log("successful request!");
	});
	db.once('db_get_response_error', function(msg) {
		res.send(msg);
		console.log("we borked :(");
	});
	db.get_table('user_name', req.query.user_name, 'Pantry');
});
app.get('/full_ingredients_table', function(req, res) {
	db.once('db_get_response_success', function(msg) {
		res.send(msg);
		console.log("successful request!");
	});
	db.once('db_get_response_error', function(msg) {
		res.send(msg);
		console.log("we borked :(");
	});
	db.get_table('user_name', req.query.user_name, 'Ingredients');
});
