'use strict'

// Creates pages to be sent back to client

function renderHomePage() {
	var html = "";
	html += "<p>Welcome to Digital Pantry! Please sign in.</p>";
	html += "<input type='text' id='username' placeholder='Enter Username'>";
	html += "<input type='password' id='password' placeholder='Enter Password'>";
	html += "<button onclick='login()'>Login</button>";
	return html;
}

function renderViewIngredientsPage() {
	var html = "You've logged in! Page Under Construction!";
	return html;
}

function renderAddIngredientsPage() {
	var html = "Page Under Construction!";
	return html;
}
function renderViewRecipesPage() {
	var html = "Page Under Construction!";
	return html;
}

function renderCreateRecipePage() {
	var html = "Page Under Construction!";
	return html;
}
exports.renderHomePage = renderHomePage;
exports.renderViewIngredientsPage = renderViewIngredientsPage;
exports.renderAddIngredientsPage = renderAddIngredientsPage;
exports.renderViewRecipesPage = renderViewRecipesPage;
exports.renderCreateRecipePage = renderCreateRecipePage;
