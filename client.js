// Digital Pantry Client Side JavaScript
 
var data_user_name = "";

$(document).ready(function() {
	requestPage('/welcome_page');
	requestPanel("panel_logged_out");
});

function requestPage(URL) {
	console.log("Page requested: " + URL);
	$.ajax({
		type: "GET",
		url: URL,
		dataType: "text",
		data: null,
		success: function(msg) {
			document.getElementById("page-body").innerHTML = msg; // Populates page body with returned html data
			$("#page-body").trigger("create"); // Forces a refresh of page content for jQuery Mobile styling
		},
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error Requesting page " + URL + ": "+ textStatus + " " + errorThrown);
		}
	});
}

/*	Functions exactly the same as requestPage, except it populates the div of the
		side panel rather than the body.
*/
function requestPanel(URL){
	console.log(URL);
	$.ajax({
		type: "GET",
		url: URL,
		dataType: "text",
		data: null,
		success:function(msg) {
			document.getElementById("panel-inner").innerHTML = msg;
			$("#panel-inner").trigger("create");
		},
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error requesting panel " + URL + ": " + textStatus + " " + errorThrown);
		}
	});
}

function requestTable(table) {
	console.log("Requested table: " + table);
	var params = {
		user_name: data_user_name
	};
	$.ajax({
		type: "GET",
		url: table,
		dataType: "text",
		data: params,
		success: function(msg) {
			document.getElementById("display").innerHTML = msg;
			$("#display").trigger("create");
		},
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error requesting data: " + textStatus + " " + errorThrown);
		}
	});
}

/*
	Begin code that Nick added
*/
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
/*
	End code that Nick added
*/

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
			requestPanel('./panel_logged_in');
			requestPage('./homepage');
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
			login();
		},
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error logging in: " + textStatus + " " + errorThrown);
		}
	});
}

function submitIngredientsQuantity() {
	var ingredients_quantity = $("#ingredients_quantity").val();
	var params = {
		quantity: ingredients_quantity,
		user_name: data_user_name
	};
	
	$.ajax({
		type: "POST",
		url: "./submit_ingredients_quantity",
		dataType: "text",
		data: params,
		
		success: function(msg) {
			document.getElementById("display").innerHTML = msg;
			$("#display").trigger("create");
		},
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error submitting number of ingredients: " + textStatus + " " + errorThrown);
		}
	});
}

function submitRecipe() {
	
}