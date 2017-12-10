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

/*	/panel_logged_in and /panel_logged_out send the data for the panel.
*/
app.get('/panel_logged_in', function(req, res) {
	res.send(page_manager.renderPanelLoggedIn());
});
app.get('/panel_logged_out', function(req, res) {
	res.send(page_manager.renderPanelLoggedOut());
});

// pantry_table sends the full table for a particular user.
app.get('/pantry_table', function(req, res) {
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

// recipes_table sends the full list of recipes.
app.get('/recipes_list', function(req, res) {
	db.once('db_get_response_success', function(msg) {
		res.send(msg);
		console.log("successful request!");
	});
	db.once('db_get_response_error', function(msg) {
		res.send(msg);
		console.log("we borked :(");
	});
	db.get_table('user_name', req.query.user_name, 'Recipes');
});

/*
	Begin code that Nick added
*/
app.get('/ingredient_add', function(req, res){
	db.once('db_pantry_add_fail', function(msg){
		res.send(msg);
	});
	db.once('db_pantry_add_success', function(msg){
		res.send(true);
	});

	db.modify_pantry_row(db.row_count("Pantry"), req.body.user_name, req.body.ingredient_name, req.body.measurement_unit, req.body.quantity);
});
app.get('/recipe_add', function(req, res){
	db.once('db_adding_recipe_fail', function(msg){
		res.send(msg);
	});
	db.once('db_adding_recipe_success', function(req, res){
		res.send(true);
	});

	db.add_recipe(req.body.recipe_instructions, req.body.recipe_id, req.body.recipe_name, req.body.user_name, req.body.ingredients);
});
/*
	End code that Nick added
*/
