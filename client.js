// Digital Pantry Client Side JavaScript
 
$(document).ready(function() {
	requestPage("./homepage");
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
