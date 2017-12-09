'use strict'

var EventEmitter = require('events').EventEmitter;
var mysql = require('mysql');

var con = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'DrexelU',
	database:'PantryBase'
});

con.connect(function(err) {
	if(err){
		console.log(err);
	}
	else{
		console.log("Database successfully connected");
	}
});


class db extends EventEmitter{
	//equip db with identical functions and attributes to Weather
	constructor(){super();}
	
	//INITIAL AUTHENTICATION REQUEST
	authenticate(username, password){
		var self = this;
		var q = "SELECT first_name from Users where user_name = \'" 
					+ username + "\' && password = \'" + password+"\'";
		con.query(q, function(err, rows, field){
			if (err){
				self.emit('auth', false);
				console.log("error in connection query");
			}
			else
			{
				if (rows.length == 0){
					self.emit('auth', false);
				}
				self.emit('auth', true);
				console.log("We did it???");
			}
		});
	}
	/***************************************************************************
		HTML table MySQL requests
			All of these functions request for multiple rows from the mysql table,
				and output their result in an HTML-formatted table.
			For now, all of these functions return an empty string if the table
				request failed.
	***************************************************************************/
	get_table(key_name, key, table){
		var self = this;
		var sql_string = "SELECT * FROM " + table + " WHERE " + key_name + " = '" + key + "'";
		con.query(sql_string, function(err, rows, fields) {
			if (!err){
				if (table == "Pantry") {
					var html = "";
					html += "<table data-role='table' id='display_table' data-mode='reflow' class='ui-responsive'>";
					html += "<thead>";
					html += "<tr>";
					html += "<th>Ingredient Name</th>";
					html += "<th>Measurement Unit</th>";
					html += "<th>Quantity</th>";
					html += "</tr>";
					html += "</thead>";
					html += "<tbody>";
					for (var i = 0; i < rows.length; i++) {
						html += "<tr>";
						html += "<td>" + rows[i].ingredient_name + "</td>";
						html += "<td>" + rows[i].measurement_unit + "</td>";
						html += "<td>" + rows[i].quantity.toString() + "</td>";
						html += "</tr>";
					}
					html += "</tbody>";
					html += "</table>";
				}
				else if (table == "Recipes") {
					var html = "";
					html += "<div class='ui-grid-a'>";
					for (var i = 0; i < rows.length; i++) {
						if (i % 2 == 0) {
							html += "<div class='ui-block-a'>";
						}
						else {
							html += "<div class='ui-block-b'>";
						}
						html += "<div class='ui-body ui-body-a ui-corner-all'>";
						html += "<h3>" + rows[i].recipe_name + "</h3>";
						html += "<h4>" + rows[i].user_name + "</h4>";
						html += "<p>" + rows[i].recipe_instructions + "</p>";
						html += "</div>";
						html += "</div>";
					}
					html += "</div>";
				}
				self.emit('db_get_response_success', html);
			}
			else {
				console.log('Error making the following SQL request: ' + sql_string);
				self.emit('db_get_response_error', err);
			}
		});
	}
	/***************************************************************************
		Specific requests
			These functions return specific requests from a table.
			These functions emit data in the form of basic javascript data types,
				rather than HTML.
	***************************************************************************/
	get_pantry_ingredient_count(username, ingredient_name){
		var count = "";
		var self = this;
		/*	implementation needed -
				request from mysql pantry table that returns
					the count column of a row where
					ingredient_name=ingredient_name and username=username.
				format of the result into an integer.
		*/
		self.emit('pantry_ingredient_count', count);
	}
	/******************************************************************************
		Basic modification functions
			The major purpose of these is to modify a row in the database.
			All of these will output an error message, which is blank on success.
	******************************************************************************/
	modify_users_row(user_name, password, first_name, last_name){
		var self = this;
		self.emit('success_status', "");
	}
	modify_pantry_row(id, user_name, ingredient_name, measurement_unit, quantity){
		var self = this;
		self.emit('success_status', "");
	}
	modify_ingredients_row(recipe_id, ingredient_name, measurement_unit, quantity){
		var self = this;
		self.emit('success_status', "");
	}
	modify_recipes_row(recipe_instructions, recipe_id, recipe_name, user_name){
		var self = this;
		self.emit('success_status', "");
	}
}

module.exports = db;
