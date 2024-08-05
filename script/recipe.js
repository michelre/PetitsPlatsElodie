// Fonction pour afficher les recettes sur la page
function displayRecipes(recipes) {
    const descriptions = [];
    const ingredients = [];
    const imgUrl = 'assets/imgRecipes/';

    const recipesContainer = document.querySelector('.recipes');
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('article');
        recipeCard.className = 'recipe-card';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';

        const image = document.createElement('img');
        image.className = 'image';
        image.src = imgUrl + recipe.image;
        image.alt = recipe.name;

        const time = document.createElement('p');
        time.className = 'recipe-time';
        time.textContent = `${recipe.time} min`;

    

        const recipeDiv = document.createElement('div');
        recipeDiv.className ='recipe-div';
        const nameRecipes = document.createElement('h2');
        nameRecipes.textContent = recipe.name;
        const descriptionTitle = document.createElement('h4');
        descriptionTitle.textContent = 'Recette';
        const descriptionRecipes = document.createElement('p');
        descriptionRecipes.className = 'recipe-description';
        descriptionRecipes.textContent = recipe.description;
        descriptions.push(recipe.description); // Ajouter la description au tableau descriptions

        const divIngredient = document.createElement('div');
        divIngredient.className ='recipe-ingredient';
        const ingredientTitle = document.createElement('h4')
        ingredientTitle.textContent = 'Ingrédients';

        const ingredientsList = document.createElement('ul');
        
        recipe.ingredients.forEach(ingredientItem => {
            const ingredientNameLi = document.createElement('li');
            ingredientNameLi.textContent = ingredientItem.ingredient;
            ingredientsList.appendChild(ingredientNameLi);

            const ingredientDetailLi = document.createElement('li');
            let ingredientDetailText = '';
            if (ingredientItem.quantity) {
                ingredientDetailText += ingredientItem.quantity;
            }
            if (ingredientItem.unit) {
                ingredientDetailText += ` ${ingredientItem.unit}`;
            }
            ingredientDetailLi.textContent = ingredientDetailText;
            ingredientsList.appendChild(ingredientDetailLi);

            ingredients.push(`${ingredientItem.ingredient}: ${ingredientDetailText}`);
        });

        imageContainer.appendChild(image);
        imageContainer.appendChild(time);
        recipeCard.appendChild(imageContainer); 
        recipeDiv.appendChild(nameRecipes);
        recipeDiv.appendChild(descriptionTitle);
        recipeDiv.appendChild(descriptionRecipes);
        recipeDiv.appendChild(ingredientTitle);
        recipeDiv.appendChild(divIngredient); 
        divIngredient.appendChild(ingredientsList);
        recipeCard.appendChild(recipeDiv);
        recipesContainer.appendChild(recipeCard);
    });
}