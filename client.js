// Digital Pantry Client Side JavaScript
 
var data_user_name = "";

$(document).ready(function() {
	requestPageContent('/welcome_page', 'page-body', null);
	requestPageContent('/panel_logged_out', 'panel-inner', null);
});

function requestPageContent(URL, display_location, params) {
	$.ajax({
		type: "GET",
		url: URL,
		dataType: "text",
		data: params,
		success: function(msg) {
			document.getElementById(display_location).innerHTML = msg; // Populates page body with returned html data
			$("#" + display_location).trigger("create"); // Forces a refresh of page content for jQuery Mobile styling
		},
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error requesting page content for " + URL + ": "+ textStatus + " " + errorThrown);
		}
	});
}

function addIngredient()
{
	var name = document.getElementById("ingredient_name").value;
	var unit = document.getElementById("measurement_unit").value;
	var quant = document.getElementById("quantity").value;
	var URL = "./ingredient_add";
	var params = {
		user_name: data_user_name,
		ingredient_name: name,
		measurement_unit: unit,
		quantity: quant
	};
	$.ajax({
		type: "GET",
		url: URL,
		dataType: "text",
		data: params,
		success: function(msg) {
			if (msg[0])
			{
				console.log(msg);
				alert("Successfully added ingredient");
				document.getElementById("ingredient_name").value = "";
				document.getElementById("measurement_unit").value = "";
				document.getElementById("quantity").value = "";
			}
			else
			{
				alert("Error submiting ingredients: " + msg);
			}
		},
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error submitting ingredient: " + errorThrown);
		}
	});
}

function login() {
	var params = {
		username: $("#username").val(),
		password: $("#password").val()
	};
	
	$.ajax({
		type: "POST",
		url: "./login",
		dataType: "text",
		data: params,
		
		success: function(msg) {
			requestPageContent('./panel_logged_in', 'panel-inner', null);
			requestPageContent('./homepage', 'page-body', null);
			data_user_name = params.username;
			console.log(msg);
		},
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error logging in: " + textStatus + " " + errorThrown);
		}
	});
}

function createAccount() {
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
		
		success: function(msg) {
			alert(msg);
			login();
		},
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error creating account: " + textStatus + " " + errorThrown);
		}
	});
}

function submitIngredientsQuantity() {
	var params = {
		quantity: $("#ingredients_quantity").val(),
		user_name: data_user_name
	};
	
	$.ajax({
		type: "POST",
		url: "./submit_ingredients_quantity",
		dataType: "text",
		data: params,
		
		success: function(msg) {
			document.getElementById("page-body").innerHTML = msg;
			$("#page-body").trigger("create");
		},
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error submitting number of ingredients: " + textStatus + " " + errorThrown);
		}
	});
}

function submitRecipe() {
	
}
