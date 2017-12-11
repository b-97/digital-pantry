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
});
app.post('/create_account', function(req, res) {
	db.once('db_users_add_success', function(msg) {
		console.log("Successfully created a new account.");
		return res.send(msg);
	});
	db.once('db_users_add_fail', function(msg) {
		console.log("Failed to create a new account.");
		return res.send(msg);
	});
	db.modify_users_row(req.body.username, req.body.password, req.body.first_name, req.body.last_name);
});

/*
	/homepage, /view_ingredients_page, /add_ingredients_page,
	/view_recipes_page, /add_recipes_page are all GET requests
	that simply load the HTML data for a particular page.
*/
app.get('/welcome_page', function(req, res) {
	res.send(page_manager.renderWelcomePage());
});
app.get('/login_page', function(req, res) {
	return res.send(page_manager.renderLoginPage());
});
app.get('/create_account_page', function(req, res) {
	res.send(page_manager.renderCreateAccountPage());
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

app.get('/ingredient_add', function(req, res){
	db.once('db_pantry_add_fail', function(msg){
		res.send([false, msg]);
	});
	db.once('db_pantry_add_success', function(msg){
		res.send([true]);
	});
	db.once('count_done', function(msg){
		db.modify_pantry_row(msg, req.query.user_name, req.query.ingredient_name, req.query.measurement_unit, req.query.quantity);
	});
	db.row_count("Pantry");
});
app.get('/recipe_add', function(req, res){
	db.once('db_adding_recipe_fail', function(msg){
		res.send(msg);
	});
	db.once('db_adding_recipe_success', function(req, res){
		res.send(true);
	});

	db.add_recipe(req.query.recipe_instructions, req.query.recipe_id, req.query.recipe_name, req.query.user_name, req.query.ingredients);
});

app.post('/submit_ingredients_quantity', function(req, res) {
	db.once('db_get_rows_success', function(msg) {
		res.send(page_manager.renderCreateIngredientsDropdowns(req.body.quantity, msg));
	});
	db.once('db_get_rows_error', function(msg) {
		res.send(msg);
	});
	db.get_rows(req.body.user_name, 'Pantry');
});
