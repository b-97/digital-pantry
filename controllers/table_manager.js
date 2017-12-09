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
		var found = false;
		var self = this;
		/*
			implementation needed -
				request from mysql USER table the combination of username and 
				password. if it exists, set found to true. 
		*/
		var q = "SELECT first_name from Users where user_name = " + username + " && password = " + password;
		con.query(q, function(err, rows, field){
			if (err)
			{
				self.emit('auth', false);
			}
			else
			{
				if (rows.length == 0)
				{
					self.emit('auth', false);
				}
				self.emit('auth', true);
			}
		});
		self.emit('auth', found); //emit the result
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
		var sql_string = "SELECT * FROM "+table+" WHERE "+key_name+" = \'"+key+"\';"
		con.query(sql_string, function(err, rows, fields) {
			if(!err){
				console.log(rows);
				self.emit('db_get_response_success', rows);
			}
			else{
				console.log('Error making the following SQL request: ' + sql_string);
				self.emit('db_get_response_error', err);
			}
		}
		);
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
