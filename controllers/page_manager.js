'use strict'

// Creates pages to be sent back to client

function renderWelcomePage() {
	var html = "";
	html += "<p>Welcome to Digital Pantry! Please sign in or create an account below.</p>";
	html += "<button onclick=\"requestPageContent('/login_page', 'page-body', null)\">Sign In</button>";
	html += "<button onclick=\"requestPageContent('/create_account_page', 'page-body', null)\">Create Account</button>";
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
	html += "<p>Thank you for signing in! Digital Pantry is the best way to manage your recipes and ingredients. Get started by using the links below.</p>";
	html += "<button onclick=\"requestPageContent('/view_ingredients_page', 'page-body', null)\">View Ingredients</button>";
	html += "<button onclick=\"requestPageContent('/add_ingredients_page', 'page-body', null)\">Add Ingredients</button>";
	html += "<button onclick=\"requestPageContent('/view_recipes_page', 'page-body', null)\">View Recipes</button>";
	html += "<button onclick=\"requestPageContent('/add_recipes_page', 'page-body', null)\">Add a Recipe</button>";
	return html;
}

function renderViewIngredientsPage() {
	var html = "";
	html += "<h1>List of Ingredients in Pantry</h1>";
	html += "<button onclick=\"requestPageContent('/pantry_table', 'display', {user_name: data_user_name})\">Display Ingredients</button>";
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
	html += "<button onclick='addIngredient()'>Add Ingredient</button>";
	return html;
}
function renderViewRecipesPage() {
	var html = "";
	html += "<h1>List of Recipes in Pantry</h1>";
	html += "<button onclick=\"requestPageContent('/recipes_list', 'display', {user_name: data_user_name})\">Display Recipes</button>";
	html += "<div id='display'>";
	html += "<!-- To be populated by requestTable -->";
	html += "</div>";
	return html;
}

function renderIngredientsQuantityPage() {
	var html = "";
	html += "<h1>Create a Recipe from Ingredients in Pantry</h1>";
	html += "<input type='text' id='ingredients_quantity' placeholder='Enter the number of ingredients this recipe will have'>";
	html += "<button onclick=\"requestPageContent('/submit_ingredients_quantity', 'page-body', {quantity: $('#ingredients_quantity').val(), user_name: data_user_name})\">Submit</button>";
	return html;
}

function renderCreateRecipePage(ingredients_quantity, rows) {
	var html = "";
	html += "<h1>Create a Recipe from Ingredients in Pantry</h1>";
	html += "<h3>Enter Recipe Information Below</h3>";
	html += "<input type='text' id='recipe_name' placeholder='Enter the recipe name'>";
	for (var i = 0; i < ingredients_quantity; i++) {
		html += "<select id='ingredient_choice_" + i + "'>";
		html += "<optgroup class='ui-block-a' label='Select an Ingredient'>";
		console.log("In page_manager: " + rows);
		for (var j = 0; j < rows.length; j++) {
			html += "<option id='ingredient_" + i + "_" + j + "' value='" + rows[j].ingredient_name + "'>" + rows[j].ingredient_name + "</option>";
		}
		html += "</select>";
		html += "<input class='ui-block-b' type='text' id='quant" + i + "' placeholder='Enter quantity'></input>";
	}
	html += "<textarea id='recipe_instructions' placeholder='Enter recipe instructions here'></textarea>";
	html += "<button onclick='submitRecipe()'>Submit Recipe</button>";
	return html;
}

function renderPanelLoggedIn() {
	var html = "";
	html += "<h3>Welcome to your personal pantry!</h3>";
	html += "<ul data-role='listview' data-inset='true'>";
	html += "<li data-icon='false'><a onclick=\"requestPageContent('/homepage', 'page-body', null)\">Homepage</a></li>";
	html += "<li data-icon='false'><a onclick=\"requestPageContent('/view_ingredients_page', 'page-body', null)\">View Ingredients</a></li>";
	html += "<li data-icon='false'><a onclick=\"requestPageContent('/add_ingredients_page', 'page-body', null)\">Add Ingredients</a></li>";
	html += "<li data-icon='false'><a onclick=\"requestPageContent('/view_recipes_page', 'page-body', null)\">View Recipes</a></li>";
	html += "<li data-icon='false'><a onclick=\"requestPageContent('/add_recipes_page', 'page-body', null)\">Add a Recipe</a></li>";
	html += "</ul>";
	return html;
}

function renderPanelLoggedOut() {
	var html = "";
	html += "<h3>Please sign in or create an account below.</h3>";
	html += "<ul data-role='listview' data-inset='true'>";
	html += "<li data-icon='false'><a onclick=\"requestPageContent('/welcome_page', 'page-body', null)\">Homepage</a></li>";
	html += "<li data-icon='false'><a onclick=\"requestPageContent('/login_page', 'page-body', null)\">Sign In</a></li>";
	html += "<li data-icon='false'><a onclick=\"requestPageContent('/create_account_page', 'page-body', null)\">Create Account</a></li>";
	html += "</ul>";
	return html;
}

exports.renderWelcomePage = renderWelcomePage;
exports.renderLoginPage = renderLoginPage;
exports.renderCreateAccountPage = renderCreateAccountPage;
exports.renderHomePage = renderHomePage;
exports.renderViewIngredientsPage = renderViewIngredientsPage;
exports.renderAddIngredientsPage = renderAddIngredientsPage;
exports.renderViewRecipesPage = renderViewRecipesPage;
exports.renderIngredientsQuantityPage = renderIngredientsQuantityPage;
exports.renderCreateRecipePage = renderCreateRecipePage;
exports.renderPanelLoggedIn = renderPanelLoggedIn;
exports.renderPanelLoggedOut = renderPanelLoggedOut;
