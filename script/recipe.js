// Fonction pour afficher les recettes sur la page
function displayRecipes(recipes) {    
    const descriptions = [];
    const ingredients = [];
    const imgUrl = 'assets/imgRecipes/';

    // Création des fiches pour les recettes
    const recipesContainer = document.querySelector('.recipes');
    recipesContainer.innerHTML = '';


    recipes.forEach(recipe => {
        // Création de l'élément article pour chaque recette
        const recipeCard = document.createElement('article');
        recipeCard.className = 'recipe-card';
        recipesContainer.appendChild(recipeCard);

        // Création de la div pour l'image
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        recipeCard.appendChild(imageContainer); 

        // Ajout de l'image
        const image = document.createElement('img');
        image.className = 'img-fluid';
        image.src = imgUrl + recipe.image;
        image.alt = recipe.name;
        imageContainer.appendChild(image);

        // Ajout du temps de préparation
        const time = document.createElement('p');
        time.className = 'recipe-time';
        time.textContent = `${recipe.time} min`;
        imageContainer.appendChild(time);

        // Création de la div pour la description
        const recipeDiv = document.createElement('div');
        recipeDiv.className ='recipe-div';
        recipeCard.appendChild(recipeDiv);

        // Ajout du nom de la recette
        const nameRecipes = document.createElement('h2');
        nameRecipes.textContent = recipe.name;
        recipeDiv.appendChild(nameRecipes);

        // Ajout du titre de la description
        const descriptionTitle = document.createElement('h4');
        descriptionTitle.textContent = 'Recette';
        recipeDiv.appendChild(descriptionTitle);

        // Ajout de la description de la recette
        const descriptionRecipes = document.createElement('p');
        descriptionRecipes.className = 'recipe-description';
        descriptionRecipes.textContent = recipe.description;

        // Ajouter la description au tableau descriptions
        descriptions.push(recipe.description); 
        recipeDiv.appendChild(descriptionRecipes);

        // Création du conteneur pour les ingrédients
        const divIngredient = document.createElement('div');
        divIngredient.className = 'recipe-ingredient';
        recipeDiv.appendChild(divIngredient); 

        const ingredientTitle = document.createElement('h4');
        ingredientTitle.textContent = 'Ingrédients';
        divIngredient.appendChild(ingredientTitle);

        const ingredientsList = document.createElement('ul');
        ingredientsList.className = 'ingredients-list';
        divIngredient.appendChild(ingredientsList);

        // Boucle ajout des ingrédients dans li
        recipe.ingredients.forEach(ingredientItem => {
                const ingredientDivDetail = document.createElement('div');
                ingredientDivDetail.classList.add('div-ingredient');
                
                // Ajout du nom de l'ingrédient au li
            const ingredientNameLi = document.createElement('li');
            ingredientNameLi.classList.add('ingredient-name');
                ingredientNameLi.textContent = ingredientItem.ingredient;
                ingredientDivDetail.appendChild(ingredientNameLi);

                // Ajout des mesures et unité s'il y en a 
                const ingredientDetailLi = document.createElement('li');
                ingredientDetailLi.classList.add('ingredient-detail');
                let ingredientDetailText = '';
            if (ingredientItem.quantity) {
                    ingredientDetailText += ingredientItem.quantity;
            }
            if (ingredientItem.unit) {
                ingredientDetailText += ` ${ingredientItem.unit}`;
            }
                ingredientDetailLi.textContent = ingredientDetailText;
                ingredientDivDetail.appendChild(ingredientDetailLi);
    
                // Ajouter l'élément ingredientDivDetail à la liste des ingrédients
                ingredientsList.appendChild(ingredientDivDetail);
            });
    
       
    });
}

