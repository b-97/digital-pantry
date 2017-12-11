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
	html += "<button onclick=\"requestTable(\'/pantry_table\')\">Display Ingredients</button>";
	html += "<div id='display'>";
	html += "<!-- To be populated by requestTable -->";
	html += "</div>";
	console.log(html);
	return html;
}

function renderAddIngredientsPage() {
	var html = "";
	html += "<h1>Add an Ingredient to the Pantry</h1>";
	html += "<input type='text' id='ingredient_name' placeholder='Enter Ingredient Name'>";
	html += "<input type='text' id='measurement_unit' placeholder='Enter Measurement Unit'>";
	html += "<input type='text' id='quantity' placeholder='Enter Quantity'>";
	html += "<button onclick=\"addIngredient()\">Add Ingredient</button>";
	return html;
}
function renderViewRecipesPage() {
	var html = "";
	html += "<h1>List of Recipes in Pantry</h1>";
	html += "<button onclick=\"requestTable(\'/recipes_list\')\">Display Recipes</button>";
	html += "<div id='display'>";
	html += "<!-- To be populated by requestTable -->";
	html += "</div>";
	return html;
}

function renderCreateRecipePage() {
	var html = "";
	html += "<h1>Create a Recipe from Ingredients in Pantry</h1>";
	html += "<input type='text' id='ingredients_quantity' placeholder='Enter the number of ingredients this recipe will have'>";
	html += "<button onclick=\"submitIngredientsQuantity()\">Submit</button>";
	html += "<div id='display'>";
	html += "<!-- To be populated by submitIngredientsQuantity -->";
	html += "</div>";
	return html;
}

function renderCreateIngredientsDropdowns(ingredients_quantity, user_name, rows) {
	var html = "";
	html += "<h3>Enter Recipe Information Below</h3>";
	for (var i = 0; i < ingredients_quantity; i++) {
		html += "<select id='ingredient_choice" + i + "'>";
		html += "<optgroup label='Select an Ingredient'>";
		for (var j = 0; j < rows.length; j++) {
			if (rows[j].user_name == user_name)
			{
				html += "<option id='ingredient_" + j +  "' value='" + rows[j].ingredient_name + "'></option>";
			}
		}
		html += "</select>";
	}
	html += "<textarea id='recipe_instructions' placeholder='Enter recipe instructions here'></textarea>";
	html += "<button onclick='submitRecipe()'>Submit Recipe</button>";
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
exports.renderCreateIngredientsDropdowns = renderCreateIngredientsDropdowns;
exports.renderPanelLoggedIn = renderPanelLoggedIn;
exports.renderPanelLoggedOut = renderPanelLoggedOut;
