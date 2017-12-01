// Digital Pantry Client Side JavaScript
 
$(document).ready(function() {
	requestPage('./homepage');
});

function requestPage(URL) {
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
			alert("Error: " + textStatus + " " + errorThrown);
		}
	});
}

function login() {
	var params = {
		username: $("#username").val()
		password: $("#password").val()
	};
	
	$.ajax({
		type: "POST",
		url: "./login",
		dataType: "text",
		data: params,
		
		success: function(msg) {
			console.log(msg);
			requestPage('./view_ingredients_page');
		},
		
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error: " + textStatus + " " + errorThrown);
		}
	});
}