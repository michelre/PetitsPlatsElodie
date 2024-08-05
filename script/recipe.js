// Fonction pour afficher les recettes sur la page
function displayRecipes(recipes) {
    const descriptions = [];
    const ingredients = [];
    const imgUrl = 'assets/imgRecipes/';

    //cration des chiches pour les recettes
    const recipesContainer = document.querySelector('.recipes');
    recipes.forEach(recipe => {
        //creation de l'element l'article
        const recipeCard = document.createElement('article');
        recipeCard.className = 'recipe-card';
        //creation de la div pour l'img
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        //ajout de l'image
        const image = document.createElement('img');
        image.className = 'image';
        image.src = imgUrl + recipe.image;
        image.alt = recipe.name;
        //ajout du temps de preparation
        const time = document.createElement('p');
        time.className = 'recipe-time';
        time.textContent = `${recipe.time} min`;

        //creation de la div pour la description
        const recipeDiv = document.createElement('div');
        recipeDiv.className ='recipe-div';
        const nameRecipes = document.createElement('h2');
        nameRecipes.textContent = recipe.name;
        const descriptionTitle = document.createElement('h4');
        descriptionTitle.textContent = 'Recette';
        const descriptionRecipes = document.createElement('p');
        descriptionRecipes.className = 'recipe-description';
        descriptionRecipes.textContent = recipe.description;
        // Ajouter la description au tableau descriptions
        descriptions.push(recipe.description); 

        //creation de la div pour les ingredients, ajout du titre et ul
        const divIngredient = document.createElement('div');
        divIngredient.className ='recipe-ingredient';
        const ingredientTitle = document.createElement('h4')
        ingredientTitle.textContent = 'Ingrédients';
        const ingredientsList = document.createElement('ul');
        //boucle ajout des ingredients dans li
        recipe.ingredients.forEach(ingredientItem => {
            const ingredientNameLi = document.createElement('li');
            ingredientNameLi.textContent = ingredientItem.ingredient;
            ingredientsList.appendChild(ingredientNameLi);
            //ajout des mesures et unité s'il y en a 
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
            // Ajouter les ingrédients et details au tableau ingredients
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