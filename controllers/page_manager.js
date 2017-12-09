'use strict'

// Creates pages to be sent back to client

function renderWelcomePage() {
	var html = "";
	html += "<p>Welcome to Digital Pantry! Please sign in.</p>";
	html += "<input type='text' id='username' placeholder='Enter Username'>";
	html += "<input type='password' id='password' placeholder='Enter Password'>";
	html += "<button onclick='login()'>Login</button>";
	return html;
}

function renderHomePage() {
	var html = "";
	html += "<p>Thank you for signing in! Digital Pantry is the best way to manage your recipes and ingredients. Get started by using the drawer in the upper-left corner to navigate.</p>";
	return html;
}

function renderViewIngredientsPage() {
	var html = "";
	html += "<h1>List of Ingredients in Pantry</h1>";
	html += "<button onclick='requestTable('./ingredients_table')'>Display Ingredients</button>";
	html += "<table data-role='table' id='display_table' data-mode='reflow' class='ui-responsive'>";
	html += "<!-- To be populated by requestTable -->";
	html += "</table>";
	return html;
}

function renderAddIngredientsPage() {
	var html = "";
	html += "<h1>Add an Ingredient to the Pantry</h1>";
	html += "<input type='text' id='ingredient_name' placeholder='Enter Ingredient Name'>";
	html += "<input type='text' id='measurement_unit' placeholder='Enter Measurement Unit'>";
	html += "<input type='text' id='quantity' placeholder='Enter Quantity'>";
	html += "<button onclick='addIngredient()'>Add Ingredient</button>";
	return html;
}
function renderViewRecipesPage() {
	var html = "";
	html += "<h1>List of Recipes in Pantry</h1>";
	html += "<button onclick='requestTable('./recipes_table')'>Display Recipes</button>";
	html += "<table data-role='table' id='display_table' data-mode='reflow' class='ui-responsive'>";
	html += "<!-- To be populated by requestTable -->";
	html += "</table>";
	return html;
}

function renderCreateRecipePage() {
	var html = "";
	html += "<h1>Create a Recipe from Ingredients in Pantry</h1>";
	html += "";
	html += "";
	html += "";
	html += "";
	return html;
}

function renderPanelLoggedIn() {
	var html = "";
	html += "<h3>Welcome!</h3>";
	html += "<ul data-role='listview' data-inset='true'>";
	html += "<li data-icon='false'><a onClick=\"requestPage(\'/view_ingredients_page\')\">View Ingredients</a></li>";
	html += "<li data-icon='false'><a onClick=\"requestPage(\'/add_ingredients_page\')\">Add Ingredients</a></li>";
	html += "<li data-icon='false'><a onClick=\"requestPage(\'/view_recipes_page\')\">View Recipes</a></li>";
	html += "<li data-icon='false'><a onClick=\"requestPage(\'/add_recipes_page\')\">Add a Recipe</a></li>";
	html += "</ul>";
	return html;
}

function renderPanelLoggedOut() {
	var html = "";
	html += "<h3>Please Sign In</h3>";
	return html;
}

exports.renderWelcomePage = renderWelcomePage;
exports.renderHomePage = renderHomePage;
exports.renderViewIngredientsPage = renderViewIngredientsPage;
exports.renderAddIngredientsPage = renderAddIngredientsPage;
exports.renderViewRecipesPage = renderViewRecipesPage;
exports.renderCreateRecipePage = renderCreateRecipePage;
exports.renderPanelLoggedIn = renderPanelLoggedIn;
exports.renderPanelLoggedOut = renderPanelLoggedOut;
