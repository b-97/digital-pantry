var mysql = require('mysql');
var con = mysql.createConnection({
	host: 'localhost',
	user: fs.readFileSync("../MYSQL_USER.txt","utf8"),
	password: fs.readFileSync("../MYSQL_PASS.txt","utf8"),
	database: 'student_list'
});
con.connect(function(err){
	if (err){
		console.log("ERROR! Could not connect to database!");
	}
	else{
		console.log("Connected to database!");
	}
});
exports.addRecipe(instruct, ingredients, name){ // instruct should be a string,
						// ingredients should be an array of
						// strings, and name should be a string.
	con.query('INSERT INTO Recipes ( recipe_instruction, recipe_name ) VALUES ( ' + instruct + ', ' + name + ' );',
		function(err,rows,fields) {
			if (err)
				console.log('Error during query processing');
			else{
				console.log('successfully added recipe');
			}  
		});
	//adds a recipe to the recipes list
}

exports.removeRecipe(IDnum){
	con.query('DELETE FROM Recipes, Ingredients WHERE recipe_id = ' + IDnum + ';',
		function(err,rows,fields) {
			if (err)
				console.log('Error during query processing');
			else{
				console.log('successfully removed Recipe');
			}  
		});
	//removes a recipe from the recipes list
}