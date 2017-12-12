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
	if (!err) {
		console.log("Database successfully connected");
	}
	else {
		console.log(err);
	}
});

class db extends EventEmitter {
	constructor() {
		super();
	}
	
	//INITIAL AUTHENTICATION REQUEST
	/*
		authenticate - checks to see if a username and password exists in
			the MySql database.
		Args:
			username - string
			password - string
		Emits:
			auth - boolean result of the authentication
	*/
	authenticate(username, password) {
		var self = this;
		var sql_query = "SELECT first_name FROM Users WHERE user_name = '" +
			username + "' && password = '" + password + "';";

		con.query(sql_query, function(err, rows, field) {
			if (err) {
				self.emit('auth', false);
				console.log("error in connection query");
			}
			else {
				if (rows.length == 0) {			//if no result, it failed
					console.log("Access Denied.");
					self.emit('auth', false);
				}
				self.emit('auth', true);
				console.log("Access Granted.");
			}
		});
	}
	/*
		get_rows - takes a username and a table, and makes a request to the
			mysql table asking for all rows where the username matches.

		Args:
			user_name - string
			table - string
		Emits:
			db_get_rows_success - on success, return array of rows
			db_get_rows_err - on failure, return string error message
	*/
	get_rows(user_name, table) {
		var self = this;
		var sql_query = "SELECT * FROM " + table + " WHERE user_name = '" +
		user_name + "';";
		
		con.query(sql_query, function(err, rows, fields) {
			if (!err) {
				self.emit('db_get_rows_success', rows);
			}
			else {
				console.log('Error making the SQL request: ' + sql_request);
				self.emit('db_get_rows_error', err);
			}
		});
	}
	/*
		get_table - takes a key, key name and table, and makes a request to the
			mysql table asking for all rows where the username matches.
			Returns an html-formatted table or div on success, 
				an error message on failure.
		Args:
			key_name - string
			key - string
			table - string
		Emits:
			db_get_response_success - on success, return html-formatted table
			db_get_response_error - on failure, return string error message
	*/
	get_table(key_name, key, table) {
		var self = this;
		
		var sql_query = "SELECT ingredient_name FROM " +
			"Ingredients WHERE recipe_id = '12';";
		
		var ingredient_names = [];
			
		con.query(sql_query, function(err, rows, fields) {
			for (var i = 0; i < rows.length; i++) {
				ingredient_names[i] = rows[i].ingredient_name;
				console.log("Ingredient " + i + ": " + ingredient_names[i]);
			}
		});
		
		sql_query = "SELECT * FROM " + table + " WHERE " + key_name +
			" = '" + key + "';";
		
		con.query(sql_query, function(err, rows, fields) {
			if (!err) {
				//render the Pantry table
				if (table == "Pantry") {
					var html = "";
					html += "<table data-role='table' id='display_table'" +
						"data-mode='reflow' class='ui-responsive'>";
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
				//render the Recipes table
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
						html += "<h2>" + rows[i].recipe_name + "</h2>";
						html += "<h3>" + rows[i].user_name + "</h3>";
						html += "<h3>Ingredients:</h3>";
						html += "<ul>";
						
						html += "</ul>";
						html += "<p>" + rows[i].recipe_instructions + "</p>";
						html += "</div>";
						html += "</div>";
					}
					html += "</div>";
				}
				self.emit('db_get_response_success', html); //emit once done
			}
			else {
				console.log('Error making SQL request: ' + sql_string);
				self.emit('db_get_response_error', err);	//emit error message
			}
		});
	}
	/*
		get_pantry_ingredient_count
			returns the count of a single ingredient in the pantry.
		Args:
			username -	string
			ingredient_name - string
		Emits:
			pantry_ingredient_count - integer result
			pantry_error - string error
	*/
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
	/*
		modify_users_row - adds a user into the database.
		Args:
			user_name - string
			password - string
			first_name - string
			last_name - string
		Emits:
			db_users_add_fail - string if failed
			db_users_add_success - string if succeeded
	*/
	modify_users_row(user_name, password, first_name, last_name){
		var self = this;
		var sql_query = "INSERT INTO Users (user_name, password, first_name, " +
			"last_name) VALUES ('" + user_name + "', '" + password  + "', '" +
			first_name + "', '" + last_name + "');";
		
		con.query(sql_query, function(err, rows, fields) {
			if (!err) {
				self.emit('db_users_add_success', "Success");
			}
			else {
				self.emit('db_users_add_fail', err);
			}
		});
	}
	/*
		check_membership - searches a table for parameters.
		Args:
			table: string table to be searched
			parameters - array of strings of arguments for the table
		Emits:
			db_not_found - string message if we failed
			db_found - string message if we succeeded
	*/
	check_membership(table, parameters) {
		var self = this;
		var sql_query = "SELECT * FROM " + table + "WHERE " + parameters[0];
		
		for (var i = 1; i < parameters.length; i++) {
			sql_query += " && ";
			sql_query += parameters[i];
		}
		sql_query += ";";

		con.query(sql_query, function(err, rows, fields){
			if (!err) {
				if (rows.length == 0) {
					self.emit('db_not_found', "Nothing there");
				}
				else {
					self.emit('db_found', "Yay");
				}
			}
			else {
				self.emit('db_not_found', err);
			}
		});
	}
	modify_pantry_row(id, user_name, ingredient_name, measurement_unit, quantity) {
		var self = this;
		this.once('db_not_found', function(msg) {
			var sql_query = "INSERT INTO Pantry (id, user_name, " +
				"ingredient_name, measurement_unit, quantity) VALUES ('" + id +
				"', '" + user_name + "', '" + ingredient_name + "', '" +
				measurement_unit + "', " + quantity + ");";
			
			con.query(sql_query, function(err, rows, fields) {
				if (!err) {
					console.log("Successfully added pantry item!");
					self.emit('db_pantry_add_success', "Success");
				}
				else {
					console.log(err);
					self.emit('db_pantry_add_fail', err);
				}
			});
		});
		this.once('db_found', function(msg){
			console.log(msg);
			increment_pantry(user_name, ingredient_name, quantity);
			self.emit('db_pantry_add_success', "Done");
		});
		self.check_membership("Pantry", "id = "+id);
	}
	modify_ingredients_row(recipe_id, ingredient_name, measurement_unit, quantity) {
		var self = this;
		var sql_query = "INSERT INTO Ingredients (recipe_id, ingredient_name," +
			" measurement_unit, quantity) VALUES ('" + recipe_id + "', '" +
			ingredient_name + "', '" + measurement_unit + "', " + quantity +
			");";
		
		con.query(sql_query, function(err, rows, fields){
			if (!err) {
				self.emit('db_ingredient_add_success', "Success");
			}
			else {
				self.emit('db_ingredient_add_fail', err);
			}
		});
	}
	modify_recipes_row(recipe_instructions, recipe_id, recipe_name, user_name){
		var self = this;
		var sql_query = "INSERT INTO Recipe (recipe_instructions, recipe_id, " +
			"recipe_name, user_name) VALUES ('" + recipe_instructions + "', '" +
			recipe_id + "', '" + recipe_name + "', '" + user_name + "');";
		
		con.query(sql_query, function(err, rows, fields){
			if (!err) {
				self.emit('db_recipe_add_success', "Success");
			}
			else {
				self.emit('db_recipe_add_fail', err);
			}
		});

	}
	row_count(table_name) {
		var self = this;
		var sql_query = "SELECT * FROM " + table_name + ";";
		
		con.query(sql_query, function(err, rows, fields) {
			if (!err) {
				console.log("Row count: " + rows.length);
				self.emit('count_done', rows.length);
			}
			else {
				console.log("Error with row count: " + sqlQ);
				self.emit('count_done', 0);
			}
		});
	}
	add_recipe(recipe_name, ingredient_names, ingredient_counts, user_name, recipe_instructions) {
		//TODO: GET ROW COUNT FOR ROW ID
		//TODO: FOR EACH INGREDIENT, GET THE MEASUREMENT UNIT
		//		^ SHOULD HAVE SAME ORDER OF INGREDIENT_NAMES
		modify_recipes_row(recipe_instructions, recipe_id, recipe_name, user_name);
		for (i = 0; i < ingredients.length; i++) {
			increment_pantry(user_name, ingredients[i][0], (ingredients[i][2] * -1));
			modify_ingredients_row(recipe_id, ingredients[i][0], ingredients[i][1], ingredients[i][2]);
		}
	}
	increment_pantry(user_name, ingredient_name, quantity) {
		var self = this;
		var sql_query = "UPDATE Pantry SET quantity = quantity + " + quantity +
			" WHERE user_name = '" + user_name + "';";
		
		con.query(sql_query, function(err, rows, fields) {
			if (!err) {
				self.emit('db_pantry_increment_success', "Jolly good!");
			}
			else {
				console.log("Error incrementing pantry: " + err);
				self.emit('db_pantry_increment_fail', err);
			}
		});
	}
}

module.exports = db;
