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

exports.checkEnoughIngredients= function(recipe) {
	var recipeID = "";
	con.query('SELECT recipe_id FROM Recipes WHERE recipe_name = \'' + recipe + '\'',
	function(err,rows,fields) {
		if (err)
			console.log('Error during query processing');
		else
			recipeID = rows[0].recipe_id 
	});
	con.query('SELECT * FROM Ingredients WHERE recipe_id = \'' + recipeID + '\'',
	function(err,rows,fields) {
		if (err)
			console.log('Error during query processing');
		else
			for(var i = 0; i < rows.length; i++){
				var json = rows[i];
				con.query('SELECT quantity FROM Pantry WHERE ingredient_name = \'' + json.ingredient_name + '\'',
				function(err,rows,fields) {
					if (err)
						console.log('Error during query processing');
					else
						json2=rows[0];
						if (json.quantity > json2.quantity){
							return false
						} 
				});
			}
			return true;
	});
	// checks the values of each ingredient required by our recipe.
	// if we have the required ingredients, return true.
	// otherwise, we return false.
}

exports.addIngredients = function(ingredient, amount) {
	con.query('SELECT * FROM Pantry WHERE ingredient_name = \'' + ingredient + '\'',
	function(err,rows,fields) {
		if (err)
			console.log('Error during query processing');
		else
			var to_add_to = rows[0].quantity;
			var newVal = to_add_to + amount
			con.query('UPDATE pantry SET quantity = \'' + newVal + '\' WHERE ingredient_name = \'' + ingredient + '\'',
				function(err,rows,fields) {
					if (err)
						console.log('Error during query processing');
					else
						console.log('updated quantity of ' + ingredient + ' from ' + to_add_to + ' to ' + newVal + '!')
				});
	});
	//adds value of amount to the ingredient in the pantry
}

exports.removeIngredients = function(ingredient, amount) {
	con.query('SELECT * FROM Pantry WHERE ingredient_name = \'' + ingredient + '\'',
	function(err,rows,fields) {
		if (err)
			console.log('Error during query processing');
		else
			var to_lower = rows[0].quantity;
			var newVal = to_lower - amount
			con.query('UPDATE pantry SET quantity = \'' + newVal + '\' WHERE ingredient_name = \'' + ingredient + '\'',
				function(err,rows,fields) {
					if (err)
						console.log('Error during query processing');
					else
						console.log('updated quantity of ' + ingredient + ' from ' + to_lower + ' to ' + newVal + '!')
				});
	});
	//subtracts value of amount from ingredient in pantry
}

exports.listIngredientsIn(recipe){
	var recipeID = "";
	Table = "<table>";
	con.query('SELECT recipe_id FROM Recipes WHERE recipe_name = \'' + recipe + '\'',
	function(err,rows,fields) {
		if (err)
			console.log('Error during query processing');
		else
			recipeID = rows[0].recipe_id 
	});
	con.query('SELECT * FROM Ingredients WHERE recipe_id = \'' + recipeID + '\'',
	function(err,rows,fields) {
		if (err)
			console.log('Error during query processing');
		else
			for(var i = 0; i < rows.length; i++){
				var json = rows[i];
				Table += "<tr><td>" + json.ingredient_name + "</td><td>" + json.quantity + "</td><td>" + json.measurement_unit + "</td></tr>";
			}
			Table += "</table>";
			return(Table);
	});
	//checks for recipe, and lists all of the ingredients needed for it
}