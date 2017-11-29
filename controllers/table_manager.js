'use strict'
//

var fs = require('fs'); //this may be necessary for db password?
var EventEmitter = require('events').EventEmitter;
var mysql = require('mysql');
//var pass = fs.readFileSync('./../db_password); do we want this?

/*
//todo: implement database (nick???)
var con = mysql.createConnection({
	host:'???????',
	user:'???????',
	pass:'pass',
	database:'????'
});

con.connect(function(err) {
		if(err)
			console.log(err);
		else
			console.long("Database Successfully Connected!");
	}
);
*/

class db extends EventEmitter{
	//equip db with identical functions and attributes to Weather
	constructor(){super();}
	
	//INITIAL AUTHENTICATION REQUEST
	authenticate(username, password){
		var found = true;
		var self = this;
		/*
			implementation needed -
				request from mysql USER table the combination of username and 
				password. if it exists, set found to true. 
		*/
		self.emit('auth', found); //emit the result
	}
	/***************************************************************************
		HTML table MySQL requests
			All of these functions request for multiple rows from the mysql table,
				and output their result in an HTML-formatted table.
			For now, all of these functions return an empty string if the table
				request failed.
	***************************************************************************/
	get_recipe_table(username){
		var recipe_table = "";
		var self = this;
		self.emit('recipe_table', recipe_table);
	}
	get_ingredients_table(recipe){
		var ingredients_table = "";
		var self = this;
		self.emit('recipe_table', recipe_table);
	}
	get_pantry_table(username){
		var pantry_table = "";
		var self = this;
		self.emit('pantry_table', pantry_table);
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

exports.db = db;
