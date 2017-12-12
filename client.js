// Digital Pantry Client Side JavaScript
 
var data_user_name = "";

$(document).ready(function() {
	requestPageContent('/welcome_page', 'page-body', null);
	requestPageContent('/panel_logged_out', 'panel-inner', null);
});

/*
	requestPageContent - asynchronously requests HTML content from the
		webserver.
	Args:
		URL - string endpoint to request from the server
		display_location - string ID of the element's innerHTML to be replaced
		params - any GET params that need to be passed to the server.
*/
function requestPageContent(URL, display_location, params) {
	console.log("Requesting page content for " + URL +
		" to be displayed in " + display_location +
		" with params " + JSON.stringify(params));
	$.ajax({
		type: "GET",
		url: URL,
		dataType: "text",
		data: params,
		success: function(msg) {
			//Populates element with returned html data
			document.getElementById(display_location).innerHTML = msg;
			// Forces a refresh of page content for jQuery Mobile styling
			$("#" + display_location).trigger("create"); 
		},
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error requesting page content for "+URL+": "
				+ textStatus + " " + errorThrown);
		}
	});
}

/*
	addIngredient - reads the ingredient name, measurement unit, and
		quantity from the values the user enters in, and requests
		the server to add it to the database. If it succeeds, clear
		the textboxes and alert the user. If it fails, alert the user
		with the message from the server.
*/
function addIngredient(){
	//pull from the data on the web page
	var name = document.getElementById("ingredient_name").value;
	var unit = document.getElementById("measurement_unit").value;
	var quant = document.getElementById("quantity").value;

	//params to send to the server
	var params = {
		user_name: data_user_name,
		ingredient_name: name,
		measurement_unit: unit,
		quantity: quant
	};

	$.ajax({
		type: "GET",
		url: "./ingredient_add",
		dataType: "text",
		data: params,
		success: function(msg) {
			if (msg[0]){			//if msg[0] returns true
				console.log(msg);
				alert("Successfully added ingredient"); //alert user
				document.getElementById("ingredient_name").value = "";
				document.getElementById("measurement_unit").value = "";
				document.getElementById("quantity").value = ""; //clear textboxes
			}
			else{
				alert("Error submiting ingredients: " + msg); //alert user
			}
		},
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error submitting ingredient: " + errorThrown); //a;ert iser
		}
	});
}

/*
	login - authenticates the username and password entered in the text
		boxes with the Users database. On success, loads the home page
		content, allowing the user to access the rest of the site. On
		failure, alerts the user.
*/
function login() {
	var params = {
		username: $("#username").val(),
		password: $("#password").val()
	}	
	$.ajax({
		type: "POST",
		url: "./login",
		dataType: "text",
		data: params,
		
		//on success, load in the panel and home page and store the
		//username in the parameters.
		success: function(msg) {
			requestPageContent('./panel_logged_in', 'panel-inner', null);
			requestPageContent('./homepage', 'page-body', null);
			data_user_name = params.username;
			console.log(msg);
		},
		//on failure, alert the user
		//outside scope - clear text boxes?
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error logging in: " + textStatus + " " + errorThrown);
		}
	});
}

/*
	createAccount - creates an account in the database with the values from
		the text fields with IDs "username", "password", "first_name", and
		"last_name". No arguments. On success, alerts the user that it
		succeeded, and logs the user in using the credentials entered. On 
		failure, alerts the user that it failed.
*/
function createAccount() {
	//taken from text boxes
	var params = {
		username: $("#username").val(),
		password: $("#password").val(),
		first_name: $("#first_name").val(),
		last_name: $("#last_name").val()
	};
	
	$.ajax({
		type: "POST",				
		url: "./create_account",
		dataType: "text",
		data: params,
		//on success, log in and alert the user.
		success: function(msg) {
			login();
		},
		error: function(jgXHR, textStatus, errorThrown){ //on failure
			alert("Error creating account: " + textStatus + " " + errorThrown);
		}
	});
}

/*
	submitRecipe - pulls the data from all of the fields available,
		and submits it in recipe form to the server.
*/
function submitRecipe() {
	//todo: implementation.
}
