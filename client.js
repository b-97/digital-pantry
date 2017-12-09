// Digital Pantry Client Side JavaScript
 
$(document).ready(function() {
	requestPage('./welcome_page');
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
	$.ajax({
		type: "POST",
		url: table,
		dataType: "text",
		data: null,
		success: function(msg) {
			document.getElementById("display_table").innerHTML = msg;
			$("#display_table").trigger("create");
		},
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error requesting data: " + textStatus + " " + errorThrown);
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
			requestPanel('./panel_logged_in');
			requestPage('./homepage');
			console.log(msg);
		},
		error: function(jgXHR, textStatus, errorThrown){
			alert("Error logging in: " + textStatus + " " + errorThrown);
		}
	});
}
