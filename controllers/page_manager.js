'use strict'

// Creates pages to be sent back to client

function renderHomePage() {
	var html = "";
	html += "<p>Welcome to Digital Pantry! Please sign in.</p>";
	html += "<input type='text' id='username' placeholder='Enter Username'>";
	html += "<input type='password' id='userpass' placeholder='Enter Password'>";
	html += "<button onclick='login()'>Login</button>";
	return html;
}

exports.renderHomePage = renderHomePage