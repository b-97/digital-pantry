'use strict'

// Creates pages to be sent back to client

function renderWelcomePage() {
	var html = "";
	html += "<p>Welcome to Digital Pantry! Please sign in or create an account below.</p>";
	html += "<button onclick=\"requestPage(\'/login_page\')\">Sign In</button>";
	html += "<button onclick=\"requestPage(\'/create_account_page\')\">Create Account</button>";
	return html;
}

function renderLoginPage() {
	var html = "";
	html += "<input type='text' id='username' placeholder='Enter Username'>";
	html += "<input type='password' id='password' placeholder='Enter Password'>";
	html += "<button onclick='login()'>Login</button>";
	return html;
}

function renderCreateAccountPage() {
	var html = "";
	html += "<input type='text' id='username' placeholder='Enter Username'>";
	html += "<input type='password' id='password' placeholder='Enter Password'>";
	html += "<input type='text' id='first_name' placeholder='Enter First Name'>";
	html += "<input type='text' id='last_name' placeholder='Enter Last Name'>";
	html += "<button onclick='createAccount()'>Create Account</button>";
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

function renderCreateIngredientsDropdowns(ingredients_quantity, rows) {
	var html = "";
	html += "<h3>Enter Recipe Information Below</h3>";
	html += "<input type='text' id='recipe_name' placeholder='Enter the recipe name'>";
	for (var i = 0; i < ingredients_quantity; i++) {
		html += "<select id='ingredient_choice_" + i + "'>";
		html += "<optgroup label='Select an Ingredient'>";
		console.log("In page_manager: " + rows);
		for (var j = 0; j < rows.length; j++) {
			html += "<option id='ingredient_" + i + "_" + j + "' value='" + j + "'>" + rows[j].ingredient_name + "</option>";
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
	html += "<h3>Please Sign In or Create an Account</h3>";
	html += "<ul data-role='listview' data-inset='true'>";
	html += "<li data-icon='false'><a onClick=\"requestPage(\'/welcome_page\')\">Homepage</a></li>";
	html += "<li data-icon='false'><a onClick=\"requestPage(\'/login_page\')\">Sign In</a></li>";
	html += "<li data-icon='false'><a onClick=\"requestPage(\'/create_account_page\')\">Create Account</a></li>";
	html += "</ul>";
	return html;
}

exports.renderWelcomePage = renderWelcomePage;
exports.renderHomePage = renderHomePage;
exports.renderLoginPage = renderLoginPage;
exports.renderCreateAccountPage = renderCreateAccountPage;
exports.renderViewIngredientsPage = renderViewIngredientsPage;
exports.renderAddIngredientsPage = renderAddIngredientsPage;
exports.renderViewRecipesPage = renderViewRecipesPage;
exports.renderCreateRecipePage = renderCreateRecipePage;
exports.renderCreateIngredientsDropdowns = renderCreateIngredientsDropdowns;
exports.renderPanelLoggedIn = renderPanelLoggedIn;
exports.renderPanelLoggedOut = renderPanelLoggedOut;
