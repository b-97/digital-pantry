'use strict'

var EventEmitter = require('events').EventEmitter;
var mysql = require('mysql');
var con = mysql.createConnection({
	host: '35.196.244.167',
	user: 'root',
	password: '$4Donuts',
	database: 'PantryBase'
});

con.connect(function(err) {
	if (err) {
		console.log('Error connecting to database');
	}
	else {
		console.log('Database successfully connected');
	}
});

class Database extends EventEmitter {
	constructor() {
		super();
	}
	login(username, password) {
		var str = "SELECT type FROM users WHERE username=" + con.escape(username)
		+ " AND password=PASSWORD(" + con.escape(password) + ")";
		var self = this;
		
		con.query(str, function(err, rows, fields) {
			if (err) {
				console.log('Error during login.');
				return 0;
			}
			else {
				if(rows.length>0) {
					self.emit('loggedin', 1);
				}
				else {
					self.emit('loggedin', 0);
				}
			}
		});
	}
	getUserTable() {
		var str = "SELECT username FROM users order by username";
		var self = this;
		
		con.query(str, function(err, rows, fields){
			if (err) {
				console.log('Error getting user table.');
				return 0;
			}
			else {
				self.emit('usertable', rows);
			}
		});
	}
}

exports.Database = Database