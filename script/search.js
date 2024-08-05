// Fonction pour afficher les données de recherche
function displaySearch(recipes, onSelectedIngredient, onSelectedUstensil, onSelectedApplicance) {
    const btnIngredients = document.querySelector("#ingredient");
    const btnUstensils = document.querySelector("#ustensils");
    const btnAppliance = document.querySelector("#appliance");

    const ustensils = [];
    const ingredients = [];
    const appliances = [];

    //afficher qu'une seul fois les éléments
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            if (!ustensils.includes(ustensil)) {
                ustensils.push(ustensil);
            }
        });

        recipe.ingredients.forEach((ingredientItem) => {
            if (!ingredients.includes(ingredientItem.ingredient)) {
                ingredients.push(ingredientItem.ingredient);
            }
        });

        if (!appliances.includes(recipe.appliance)) {
            appliances.push(recipe.appliance);
        }
    });

    // Créer les listes
    const ingredientsList = document.createElement('div');
    ingredients.forEach((ingredient) => {
        const ingredientNameP = document.createElement('p');
        ingredientNameP.textContent = ingredient;
        ingredientsList.appendChild(ingredientNameP);

        ingredientNameP.addEventListener('click', () => {
            onSelectedIngredient(ingredient)
        })
    });

    const ustensilsList = document.createElement('div');
    ustensils.forEach((ustensil) => {
        const ustensilLi = document.createElement('p');
        ustensilLi.textContent = ustensil;
        ustensilsList.appendChild(ustensilLi);

        ustensilLi.addEventListener('click', () => {
            onSelectedUstensil(ustensil)
        })
    });

    const appliancesList = document.createElement('div');
    appliances.forEach((appliance) => {
        const applianceP = document.createElement('p');
        applianceP.textContent = appliance;
        appliancesList.appendChild(applianceP);

        applianceP.addEventListener('click', () => {
            onSelectedApplicance(appliance)
        })
    });

    // Ajout des listes aux boutons 
    btnIngredients.appendChild(ingredientsList);
    btnUstensils.appendChild(ustensilsList);
    btnAppliance.appendChild(appliancesList);

    // Ajouter des écouteurs d'événements pour les boutons
    btnIngredients.addEventListener('click', () => {
        toggleDisplay(ingredientsList);
    });

    btnUstensils.addEventListener('click', () => {
        toggleDisplay(ustensilsList);
    });

    btnAppliance.addEventListener('click', () => {
        toggleDisplay(appliancesList);
    });
}

// Fonction pour basculer l'affichage des listes
function toggleDisplay(element) {
    const allLists = document.querySelectorAll('#ingredient div, #ustensils div, #appliance div');
    allLists.forEach(list => {
        if (list !== element) {
            list.style.display = 'none';
        }
    });

    if (element.style.display === 'block') {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
}


