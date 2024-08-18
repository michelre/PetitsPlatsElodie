function displaySearch(recipes, onSelectedIngredient, onSelectedUstensil, onSelectedAppliance) {
    const btnIngredients = document.querySelector("#ingredient");
    const btnUstensils = document.querySelector("#ustensils");
    const btnAppliance = document.querySelector("#appliance");

    const ustensils = [];
    const ingredients = [];
    const appliances = [];

    // Afficher qu'une seule fois les éléments
recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
        const lowerUstensil = ustensil.toLowerCase(); // Convertir en minuscules
        if (!ustensils.includes(lowerUstensil)) {
            ustensils.push(lowerUstensil);
        }
    });

    recipe.ingredients.forEach((ingredientItem) => {
        const lowerIngredient = ingredientItem.ingredient.toLowerCase(); // Convertir en minuscules
        if (!ingredients.includes(lowerIngredient)) {
            ingredients.push(lowerIngredient);
        }
    });

    const lowerAppliance = recipe.appliance.toLowerCase(); // Convertir en minuscules
    if (!appliances.includes(lowerAppliance)) {
        appliances.push(lowerAppliance);
    }
});

   
    // Créer les listes des ingredients
    const ingredientsList = document.createElement('div');
    ingredientsList.className = 'list-group';
    ingredientsList.id = 'ingredient-list';
    ingredients.forEach((ingredient) => { // Boucle sur les ingredients et ajoute chaque ustensil dans un p
        const ingredientNameP = document.createElement('p');
        ingredientNameP.textContent = ingredient;
        ingredientsList.appendChild(ingredientNameP);
    // Ajouter un event listener sur chaque ingredient
        ingredientNameP.addEventListener('click', () => {
            onSelectedIngredient(ingredient)
        })
    });
    

    // Crée la div de la liste d'ustensils 
    const ustensilsList = document.createElement('div');
    ustensilsList.className = 'list-group';
    ustensilsList.id = 'ustensil-list';
    ustensils.forEach((ustensil) => { // Boucle sur les ustensils et ajoute chaque ustensil dans un p
        const ustensilP = document.createElement('p');
        ustensilP.textContent = ustensil;
        ustensilsList.appendChild(ustensilP);
        // Ajouter un event listener sur chaque ustensil 
        ustensilP.addEventListener('click', () => {
            onSelectedUstensil(ustensil);
        });
    });

    // Crée la div de la liste des appareils
    const appliancesList = document.createElement('div');
    appliancesList.className = 'list-group';
    appliancesList.id = 'appliance-list';
    // Boucle sur les appareils et ajoute chaque appareil dans un p
    appliances.forEach((appliance) => {
        const applianceP = document.createElement('p');
        applianceP.textContent = appliance;
        appliancesList.appendChild(applianceP);
        // Ajouter un event listener sur chaque appareil
        applianceP.addEventListener('click', () => {
            onSelectedAppliance(appliance);
        });
    });

    // Ajout des listes aux boutons
    btnIngredients.appendChild(ingredientsList);
    btnUstensils.appendChild(ustensilsList);
    btnAppliance.appendChild(appliancesList);


    // Ajouter des écouteurs d'événements pour les boutons
    btnIngredients.addEventListener('click', () => {
        toggleDisplay(btnIngredients, ingredientsList);
    });

    btnUstensils.addEventListener('click', () => {
        toggleDisplay(btnUstensils, ustensilsList);
    });

    btnAppliance.addEventListener('click', () => {
        toggleDisplay(btnAppliance, appliancesList);
    });

    // Ajouter un écouteur d'événements global pour détecter les clics à l'extérieur
    document.addEventListener('click', handleIconClick);
    document.addEventListener('click', handleClickOutside);
}
//
function toggleDisplay(button, element) {
    const allButtons = document.querySelectorAll('.category-button');
    const allLists = document.querySelectorAll('.list-group');
    

    // Cache tous les autres inputs
    allButtons.forEach(btn => {
        const input = btn.querySelector('input');
        if (input) input.style.display = 'none';
    });

    // Cache toutes les autres listes
    allLists.forEach(list => {
        if (list !== element) {
            list.style.display = 'none';
        }
    });

    
    // Récupère l'input de recherche associé au bouton cliqué
    const input = button.querySelector('input');

    // Modifie la visibilité de l'input et de la liste
    if (input.style.display === 'block') {
        input.style.display = 'none';
        element.style.display = 'none';
    } else {
        input.style.display = 'block';
        element.style.display = 'block';
    }
}

function inconsDisplay(input) {
    const iconX = document.querySelector('.fa-xmark');
    const iconMagnifyingGlass = input.parentNode.querySelector('.fa-magnifying-glass');
    const allLists = document.querySelectorAll('.list-group'); // Sélectionne toutes les listes

    // Afficher l'icône de la loupe lors du focus sur l'input
    input.addEventListener('focus', () => {
        if (iconMagnifyingGlass) {
            iconMagnifyingGlass.style.display = 'block';
        }
    });

    // Masquer l'icône de la loupe lorsque l'input perd le focus
    input.addEventListener('blur', () => {
        if (iconMagnifyingGlass) {
            iconMagnifyingGlass.style.display = 'none'; 
        }
    });

    // Afficher l'icône X lorsque l'utilisateur tape dans l'input
    input.addEventListener('input', () => {
        if (input.value.length >= 3) {
            if (iconX) {
                iconX.style.display = 'block'; 
            }
        } else {
            if (iconX) {
                iconX.style.display = 'none'; // Cache l'icône X si l'input est vide
            }
        }

    });
    //reinitialiser les listes si l'input est vidé
    iconX.addEventListener('click', () => {
        if (input.value.length >= 1) {
            input.value = '';
            iconX.style.display = 'none';
            allLists.forEach(list => {
                list.style.display = 'block';
            });
        }
    });
}
// Appliquer inconsDisplay à tous les inputs ciblées
document.querySelectorAll('.search-btn').forEach(input => {
    inconsDisplay(input);
});


function handleIconClick(event) {
    const buttonsearchIcons = document.querySelectorAll('.fa-chevron-down'); 
    let clickIcon = false;

    buttonsearchIcons.forEach(icon => {
        if (icon === event.target) { 
            clickIcon = true;
        }
    });

    if (clickIcon) {
        hideAllLists(); // Cacher toutes les listes si l'icône est cliquée
    }
}



// Fonction pour cacher la liste et l'input au clic en dehors du bouton
function handleClickOutside(event) {
    const buttons = document.querySelectorAll('.category-button');
    let clickedInside = false;

    buttons.forEach(button => {
        if (button.contains(event.target)) {
            clickedInside = true;
        }
    });

    // Si le clic n'était pas à l'intérieur d'un des boutons, cacher toutes les listes
    if (!clickedInside) {
        hideAllLists();
    }
}

// Fonction qui vide l'input, cache la liste, et réinitialise la liste complète lors du prochain affichage
function hideAllLists() {
    const allButtons = document.querySelectorAll('.category-button');
    const allLists = document.querySelectorAll('.list-group');

    allButtons.forEach(button => {
        const input = button.querySelector('input');
        if (input) {
            input.style.display = 'none';
            input.value = ''; // Vide l'input
        }
    });

    allLists.forEach(list => {
        list.style.display = 'none';
        // Réaffiche toute la liste de recherche
        const items = list.querySelectorAll('p');
        items.forEach(item => {
            item.style.display = 'block';
        });
    });
}



