'use strict'

var EventEmitter = require('events').EventEmitter;
var mysql = require('mysql');
var async = require('async');

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
			if (!err) {
				if (rows.length == 0) {			//if no result, it failed
					console.log("Access Denied.");
					self.emit('auth', false);
				}
				else {
					self.emit('auth', true);
					console.log("Access Granted.");
				}
			}
			else {
				self.emit('auth', false);
				console.log("error in connection query");
			}
		});
	}
	/*
		get_rows - takes an sql query, and makes a request to the
			mysql table asking for all rows in the query.

		Args:
			sql_query - string
		Emits:
			db_get_rows_success - on success, return rows
			db_get_rows_err - on failure, return string error message
	*/
	get_rows(sql_query) {
		var self = this;
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
		get_row_count - takes a table and returns the number of rows in it

		Args:
			table - string
		Emits:
			db_get_row_count_success - on success, return rows length
			db_get_row_count_error - on failure, return string error message
	*/
	get_row_count(table) {
		var self = this;
		var sql_query = "SELECT * FROM " + table + ";";
		
		con.query(sql_query, function(err, rows, fields) {
			if (!err) {
				self.emit('db_get_row_count_success', rows.length);
			}
			else {
				self.emit('db_get_row_count_error', err);
			}
		});
	}
	/*
		get_pantry_table - takes a username, and makes a request to the
			mysql pantry table asking for all rows in the query, and
			formats them into a table to be displayed on a page.

		Args:
			username - string
		Emits:
			db_get_pantry_table_success - on success, return html table string
			db_get_pantry_table_error - on failure, return string error message
	*/
	get_pantry_table(username) {
		var self = this;
		var sql_query = "SELECT * FROM Pantry WHERE user_name = '" + username +
			"';";
		con.query(sql_query, function(err, rows, fields) {
			if (!err) {
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
				self.emit('db_get_pantry_table_success', html); //emit once done
			}
			else {
				console.log('Error making SQL request for Pantry table');
				self.emit('db_get_pantry_table_error', err);	//emit error
			}
		});
	}
	/*
		get_recipes_table - takes a username, and makes a request to the
			mysql recipes table asking for all rows in the query, and
			formats them into a table to be displayed on a page.

		Args:
			username - string
		Emits:
			db_get_recipes_table_success - on success, return html table string
			db_get_recipes_table_error - on failure, return string error message
	*/
	get_recipes_table(username) {
		var self = this;
		var sql_query = "SELECT * FROM Recipes WHERE user_name = '" + username +
			"';";
		
		con.query(sql_query, function(err, rows, fields) {
			if (!err) {
				var html = "";
				html += "<div class='ui-grid-a'>";
				async.each(rows, function(row, callback) {
					//if (i % 2 == 0) {
						html += "<div class='ui-block-a'>";
					//}
					//else {
					//	html += "<div class='ui-block-b'>";
					//}
					html += "<div class='ui-body ui-body-a'>";
					html += "<h2>" + row.recipe_name + "</h2>";
					html += "<h4>Ingredients</h4>";
					html += "<ul>";
					var sql_query1 = "SELECT * FROM Ingredients WHERE recipe_id = '" +
						row.recipe_id + "';";
					con.query(sql_query1, function(err1, rows1, fields1) {
						for (var j = 0; j < rows1.length; j++) {
							html += "<li>" + rows1[j].quantity + " " +
							rows1[j].measurement_unit + " " +
							rows1[j].ingredient_name + "</li>";
						}
						callback();
					});
					html += "</ul>";
					html += "<h4>Instructions</h4>";
					html += "<p>" + row.recipe_instructions + "</p>";
					html += "</div>";
					html += "</div>";
				},
				function(err) {
					if (!err) {
						html += "</div>";
						self.emit('db_get_recipes_table_success', html);
					}
					else {
						self.emit('db_get_recipes_table_error', err);
					}
				});
			}
			else {
				console.log('Error making SQL request for Recipes table');
				self.emit('db_get_recipes_table_error', err);	//emit error
			}
		});
		
		
		/*var sql_query = "SELECT * FROM Ingredients WHERE recipe_id = '" +
			12 + "';";
		
		var ingredient_names = [];
		var measurement_units = [];
		var quantities = [];
			
		con.query(sql_query, function(err, rows, fields) {
			for (var i = 0; i < rows.length; i++) {
				ingredient_names[i] = rows[i].ingredient_name;
				measurement_units[i] = rows[i].measurement_unit;
				quantities[i] = rows[i].quantity;
			}
		});*/
	}
	/*
		get_pantry_ingredient_count - returns the count of a single ingredient
			in the pantry.
			
		Args:
			username -	string
			ingredient_name - string
			
		Emits:
			pantry_ingredient_count - integer result
			pantry_error - string error
	*/
	// THIS MIGHT BE EXTRANEOUS??
	/*get_pantry_ingredient_count(username, ingredient_name){
		var count = "";
		var self = this;
		//	implementation needed -
		//		request from mysql pantry table that returns
		//			the count column of a row where
		//			ingredient_name=ingredient_name and username=username.
		//		format of the result into an integer.
		
		self.emit('pantry_ingredient_count', count);
	}*/
	/*
		add_user - adds a user to the Users table.
		Args:
			user_name - string
			password - string
			first_name - string
			last_name - string
		Emits:
			db_add_user_success - on success, return string success message
			db_add_user_error - on failure, return string error message
	*/
	add_user(user_name, password, first_name, last_name) {
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
	/*
		add_pantry_item - adds an ingredient to the Pantry table.
		Args:
			id - string
			user_name - string
			ingredient_name - string
			measurement_unit - string
			quantity - string
		Emits:
			db_add_pantry_item_success - on success, return string success message
			db_add_pantry_item_error - on failure, return string error message
	*/
	add_pantry_item(id, user_name, ingredient_name, measurement_unit, quantity) {
		var self = this;
		this.once('db_not_found', function(msg) {
			var sql_query = "INSERT INTO Pantry (id, user_name, " +
				"ingredient_name, measurement_unit, quantity) VALUES ('" + id +
				"', '" + user_name + "', '" + ingredient_name + "', '" +
				measurement_unit + "', " + quantity + ");";
			
			con.query(sql_query, function(err, rows, fields) {
				if (!err) {
					console.log("Successfully added pantry item!");
					self.emit('db_add_pantry_item_success', "Success");
				}
				else {
					console.log(err);
					self.emit('db_add_pantry_item_error', err);
				}
			});
		});
		this.once('db_found', function(msg){
			console.log(msg);
			increment_pantry(user_name, ingredient_name, quantity);
			self.emit('db_add_pantry_item_success', "Done");
		});
		self.check_membership("Pantry", "id = "+id);
	}
	/*
		add_ingredient - adds an ingredient to the Ingredients table.
		Args:
			recipe_id - string
			ingredient_name - string
			measurement_unit - string
			quantity - string
		Emits:
			db_add_ingredient_success - on success, return string success message
			db_add_ingredient_error - on failure, return string error message
	*/
	add_ingredient(recipe_id, ingredient_name, measurement_unit, quantity) {
		var self = this;
		var sql_query = "INSERT INTO Ingredients (recipe_id, ingredient_name," +
			" measurement_unit, quantity) VALUES ('" + recipe_id + "', '" +
			ingredient_name + "', '" + measurement_unit + "', " + quantity +
			");";
		
		con.query(sql_query, function(err, rows, fields){
			if (!err) {
				self.emit('db_add_ingredient_success', "Success");
			}
			else {
				self.emit('db_add_ingredient_error', err);
			}
		});
	}
	/*
		add_recipe - adds a recipe to the Recipes table.
		Args:
			recipe_instructions - string
			recipe_id - string
			recipe_name - string
			user_name - string
		Emits:
			db_add_recipe_success - on success, return string success message
			db_add_recipe_error - on failure, return string error message
	*/
	add_recipe(recipe_instructions, recipe_id, recipe_name, user_name) {
		var self = this;
		var sql_query = "INSERT INTO Recipe (recipe_instructions, recipe_id, " +
			"recipe_name, user_name) VALUES ('" + recipe_instructions + "', '" +
			recipe_id + "', '" + recipe_name + "', '" + user_name + "');";
		
		con.query(sql_query, function(err, rows, fields){
			if (!err) {
				self.emit('db_add_recipe_success', "Success");
			}
			else {
				self.emit('db_add_recipe_error', err);
			}
		});
	}
	
	// WILL HAVE TO BE RENAMED TO AVOID DUPLICATION
	/*add_recipe(recipe_name, ingredient_names, ingredient_counts, user_name, recipe_instructions) {
		//TODO: GET ROW COUNT FOR ROW ID
		//TODO: FOR EACH INGREDIENT, GET THE MEASUREMENT UNIT
		//		^ SHOULD HAVE SAME ORDER OF INGREDIENT_NAMES
		add_recipe(recipe_instructions, recipe_id, recipe_name, user_name);
		for (i = 0; i < ingredients.length; i++) {
			increment_pantry(user_name, ingredients[i][0], (ingredients[i][2] * -1));
			add_ingredient(recipe_id, ingredients[i][0], ingredients[i][1], ingredients[i][2]);
		}
	}*/
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
