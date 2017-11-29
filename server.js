// Digital Pantry Server Side JavaScript

// Node Modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql  = require('mysql');

// Custom Modules
var page_manager = require('./controllers/page_manager');
var table_manager = require('./controllers/table_manager');

app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(8080, function() {
	console.log("...Server Started...");
});


/*
	/homepage, /view_ingredients_page, /add_ingredients_page,
	/view_recipes_page, /add_recipes_page are all POST requests
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

//	get_ingredients_table - pulls the username and password
// from the request, and calls 
app.get('/get_ingredients_table', function(req, res){
	
});
