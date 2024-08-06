// Fonction pour afficher les recettes sur la page
function displayRecipes(recipes) {
  const descriptions = [];
  const ingredients = [];
  const imgUrl = "assets/imgRecipes/";

  //cration des fiches pour les recettes
  const recipesContainer = document.querySelector(".recipes");
  recipesContainer.innerHTML = "";

  recipes.forEach((recipe) => {
    //creation de l'element l'article
    const recipeCard = document.createElement("article");
    recipeCard.className = "recipe-card";
    //creation de la div pour l'img
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    //ajout de l'image
    const image = document.createElement("img");
    image.className = "image";
    image.src = imgUrl + recipe.image;
    image.alt = recipe.name;
    //ajout du temps de preparation
    const time = document.createElement("p");
    time.className = "recipe-time";
    time.textContent = `${recipe.time} min`;

    //creation de la div pour la description
    const recipeDiv = document.createElement("div");
    recipeDiv.className = "recipe-div";
    const nameRecipes = document.createElement("h2");
    nameRecipes.textContent = recipe.name;
    const descriptionTitle = document.createElement("h4");
    descriptionTitle.textContent = "Recette";
    const descriptionRecipes = document.createElement("p");
    descriptionRecipes.className = "recipe-description";
    descriptionRecipes.textContent = recipe.description;
    // Ajouter la description au tableau descriptions
    descriptions.push(recipe.description);

    // Création du conteneur pour les ingrédients
    const divIngredient = document.createElement("div");
    divIngredient.className = "recipe-ingredient";

    const ingredientTitle = document.createElement("h4");
    ingredientTitle.textContent = "Ingrédients";
    divIngredient.appendChild(ingredientTitle);

    const ingredientsList = document.createElement("ul");
    ingredientsList.className = "ingredients-list";

    // Boucle ajout des ingrédients dans li
    recipe.ingredients.forEach((ingredientItem) => {
      const ingredientDivDetail = document.createElement("div");
      ingredientDivDetail.classList.add("div-ingredient");

      // Ajout du nom de l'ingrédient au li
      const ingredientNameLi = document.createElement("li");
      ingredientNameLi.classList.add("ingredient-name");
      ingredientNameLi.textContent = ingredientItem.ingredient;
      ingredientDivDetail.appendChild(ingredientNameLi);

      // Ajout des mesures et unité s'il y en a
      const ingredientDetailLi = document.createElement("li");
      ingredientDetailLi.classList.add("ingredient-detail");
      let ingredientDetailText = "";
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

    // Ajout de la liste des ingrédients à la div des ingrédients
    divIngredient.appendChild(ingredientsList);
    imageContainer.appendChild(image);
    imageContainer.appendChild(time);
    recipeCard.appendChild(imageContainer);

    recipeDiv.appendChild(nameRecipes);
    recipeDiv.appendChild(descriptionTitle);
    recipeDiv.appendChild(descriptionRecipes);

    recipeDiv.appendChild(divIngredient);
    recipeCard.appendChild(recipeDiv);
    recipesContainer.appendChild(recipeCard);
  });
}
