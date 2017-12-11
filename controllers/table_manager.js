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
	/*
		authenticate - checks to see if a username and password exists in
			the MySql database.
		Args:
			username - string
			password - string
		Emits:
			auth - boolean result of the authentication
	*/
	authenticate(username, password){
		var self = this;
		//query to search the database
		var q = "SELECT first_name from Users where user_name = \'" 
					+ username + "\' && password = \'" + password+"\'";
		con.query(q, function(err, rows, field){
			if (err){
				self.emit('auth', false);
				console.log("error in connection query");
			}
			else
			{
				if (rows.length == 0){			//if no result, it failed
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
		var sql_request = "SELECT * FROM " + table + " WHERE user_name = '" + user_name + "';";
		con.query(sql_request, function(err, rows, fields) {
			if (!err) {
				self.emit('db_get_rows_success', rows);
			}
			else {
				console.log('Error making the following SQL request: ' + sql_request);
				self.emit('db_get_rows_error', err);
			}
		});
	}
	/*
		get_table - takes a key, key name and a table, and makes a request to the
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
	get_table(key_name, key, table){
		var self = this;
		var sql_string = "SELECT * FROM " + table + " WHERE " + key_name + " = '" + key + "';";
		con.query(sql_string, function(err, rows, fields) {
			if (!err){
				if (table == "Pantry") {	//render the Pantry table
					var html = "";
					html += "<table data-role='table' id='display_table' data-mode='reflow' class='ui-responsive'>";
					html += "<thead>";						//table header
					html += "<tr>";
					html += "<th>Ingredient Name</th>";
					html += "<th>Measurement Unit</th>";
					html += "<th>Quantity</th>";
					html += "</tr>";
					html += "</thead>";
					html += "<tbody>";
					for (var i = 0; i < rows.length; i++) { //for each row
						html += "<tr>";
						html += "<td>" + rows[i].ingredient_name + "</td>";
						html += "<td>" + rows[i].measurement_unit + "</td>";
						html += "<td>" + rows[i].quantity.toString() + "</td>";
						html += "</tr>";
					}
					html += "</tbody>";
					html += "</table>";
				}
				else if (table == "Recipes") {	//render the Recipes table in a div
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
				self.emit('db_get_response_success', html); //once we're done, emit
			}
			else {
				console.log('Error making the following SQL request: ' + sql_string);
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
		var sqlQ = "INSERT INTO Users (user_name, password, first_name, "+
			"last_name) VALUES ('" + user_name + "', '" + password 
			+ "', '" + first_name + "', '" + last_name + "');";
		console.log(sqlQ);
		con.query(sqlQ, function(err, rows, fields){
			if (err)
				self.emit('db_users_add_fail', err);
			else
				self.emit('db_users_add_success', "Success");
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
	check_membership(table, parameters)
	{
		var self = this;
		var sqlQ = "SELECT * FROM " + table + "WHERE " + parameters[0];
		
		for (var i = 1; i < parameters.length; i++){
			sqlQ += " && ";
			sqlQ += parameters[i];
		}
		sqlQ += ";";

		con.query(sqlQ, function(err, rows, fields){
			if (err)
				self.emit('db_not_found', err);
			else{
				if (rows.length == 0)
					self.emit('db_not_found', "Nothing there");
				else
					self.emit('db_found', "Yay");
			}
		});
	}
	modify_pantry_row(id, user_name, ingredient_name, measurement_unit, quantity){
		var self = this;
		this.once('db_not_found', function(msg){
			var sqlQ = "INSERT INTO Pantry (id, user_name, ingredient_name, "+
				"measurement_unit, quantity) VALUES ('" + id + "', '" + 
				user_name + "', '" + ingredient_name + "', '" + measurement_unit
				+ "', " + quantity + ");";
			console.log(sqlQ);
			con.query(sqlQ, function(err, rows, fields){
				if (err){
					console.log(err);
					self.emit('db_pantry_add_fail', err);
				}
				else{
					console.log("Successfully added pantry item!");
					self.emit('db_pantry_add_success', "Success");
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
	modify_ingredients_row(recipe_id, ingredient_name, measurement_unit, quantity){
		var self = this;
		var sqlQ = "INSERT INTO Ingredients (recipe_id, ingredient_name, "+
			"measurement_unit, quantity) VALUES ('" + recipe_id +
			"', '" + ingredient_name + "', '" + measurement_unit + "', "
			+ quantity + ");";
		con.query(sqlQ, function(err, rows, fields){
			if (err)
				self.emit('db_ingredient_add_fail', err);
			else
				self.emit('db_ingredient_add_success', "Success");
		});
	}
	modify_recipes_row(recipe_instructions, recipe_id, recipe_name, user_name){
		var self = this;
		var sqlQ = "INSERT INTO Recipe (recipe_instructions, "+
			"recipe_id, recipe_name, user_name) VALUES ('" + 
			recipe_instructions + "', '" + recipe_id + "', '" +
			recipe_name + "', '" + user_name + "');";
		con.query(sqlQ, function(err, rows, fields){
			if (err)
				self.emit('db_recipe_add_fail', err);
			else
				self.emit('db_recipe_add_success', "Success");
		});

	}
	row_count(table_name){
		var self = this;
		var sqlQ = "SELECT * FROM " + table_name + ";";
		con.query(sqlQ, function(err, rows, fields){
			if (err){
				console.log("Error with row count: " + sqlQ);
				self.emit('count_done', 0);
			}
			else{
				console.log("Successful row count query: " + rows.length + " rows");
				self.emit('count_done', rows.length);
			}
		});
	}
	add_recipe(recipe_instructions, recipe_id, recipe_name, user_name, ingredients)
	{
		modify_recipes_row(recipe_instructions, recipe_id, recipe_name, user_name);
		for(i = 0; i < ingredients.length; i++){
			increment_pantry(user_name, ingredients[i][0], ingredients[i][2]);
			modify_ingredients_row(recipe_id, ingredients[i][0], ingredients[i][1], ingredients[i][2]);
		}
		self.emit('db_adding_recipe_success', "Hurray!");
	}
	increment_pantry(user_name, ingredient_name, quantity)
	{
		var self = this;
		var sqlQ = "UPDATE Pantry SET quantity = quantity + " + quantity + " WHERE user_name = '" + user_name + "';";
		con.query(sqlQ, function(err, rows, fields){
			if (err)
			{
				console.log("Error incrementing pantry: " + err);
				self.emit('db_pantry_increment_fail', err);
			}
			else
			{
				self.emit('db_pantry_increment_success', "Jolly good!");
			}
		});
	}
}

module.exports = db;
