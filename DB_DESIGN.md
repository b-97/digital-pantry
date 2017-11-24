# Table: Users
VARCHAR(20) user_name (key)
VARCHAR(20) password
VARCHAR(20) first_name
VARCHAR(20) last_name

# Table: Pantry (contains food):
VARCHAR(10) id (key) 
VARCHAR(20) user_name
VARCHAR(20) ingredient_name
VARCHAR(10) measurement_unit
INT quantity

# Table: Ingredients (contains food requirements for recipes)
VARCHAR(10) recipe_id         (recipe_id+ingredient_name are unique)
VARCHAR(20) ingredient_name
VARCHAR(10) measurement_unit
INT quantity

# Table: Recipes (contains an id and a username)
TEXT recipe_instructions
VARCHAR(10) recipe_id (key)
VARCHAR(30) recipe_name
VARCHAR(20) user_name
