export function displaySearch(recipes, onSelectedIngredient, onSelectedUstensil, onSelectedAppliance, onDeleteItem) {
    const btnIngredients = document.querySelector("#ingredient");
    const btnUstensils = document.querySelector("#ustensil");
    const btnAppliance = document.querySelector("#appliance");

    const ustensils = [];
    const ingredients = [];
    const appliances = [];

    // Afficher qu'une seule fois les éléments
recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
        const lowerUstensil = ustensil.toLowerCase();
        if (!ustensils.includes(lowerUstensil)) {
            ustensils.push(lowerUstensil);
        }
    });

    recipe.ingredients.forEach((ingredientItem) => {
        const lowerIngredient = ingredientItem.ingredient.toLowerCase(); 
        if (!ingredients.includes(lowerIngredient)) {
            ingredients.push(lowerIngredient);
        }
    });

    const lowerAppliance = recipe.appliance.toLowerCase(); 
    if (!appliances.includes(lowerAppliance)) {
        appliances.push(lowerAppliance);
    }
});

//fonction generique ajout et supp d'elements dans le container input
const handleSelectedList = (element, containerId, type) => {
    const selectedContainer = document.querySelector(`#${containerId}`);
    const newElement = document.createElement('p');
    //const iconDelete = document.createElement('i');
    //iconDelete.className = 'fa-solid fa-circle-xmark';
    newElement.className = 'list-item-container';
    newElement.innerText = element.innerText;
    element.style.display = 'none';
    selectedContainer.appendChild(newElement);
    //selectedContainer.appendChild(iconDelete);

    newElement.addEventListener('click', () => {
        newElement.remove();
        onDeleteItem(type, element.innerText);  // Utilise la fonction générique
        element.style.display = 'block';
    });
};


   
    // Créer les listes des ingredients
    const ingredientsList = document.createElement('div');
    ingredientsList.className = 'list-group';
    ingredientsList.id = 'ingredient-list';
    ingredients.forEach((ingredient) => { // Boucle sur les ingredients et ajoute chaque ustensil dans un p
        const ingredientNameP = document.createElement('p');
        ingredientNameP.textContent = ingredient;
        ingredientsList.appendChild(ingredientNameP);
    // Ajouter un event listener sur chaque ingredient
        ingredientNameP.addEventListener('click', (e) => {
            onSelectedIngredient(ingredient)
            handleSelectedList(e.target, 'ingredient-container', 'ingredient');

        })
    });
    

    // Crée la liste d'ustensils 
    const ustensilsList = document.createElement('div');
    ustensilsList.className = 'list-group';
    ustensilsList.id = 'ustensil-list';
    ustensils.forEach((ustensil) => { // Boucle sur les ustensils et ajoute chaque ustensil dans un p
        const ustensilP = document.createElement('p');
        ustensilP.textContent = ustensil;
        ustensilsList.appendChild(ustensilP);
        // Ajouter un event listener sur chaque ustensil 
        ustensilP.addEventListener('click', (e) => {
            onSelectedUstensil(ustensil);
            handleSelectedList(e.target,'ustensil-container', 'ustensil')
        });
    });

    // Crée la liste des appareils
    const appliancesList = document.createElement('div');
    appliancesList.className = 'list-group';
    appliancesList.id = 'appliance-list';
    // Boucle sur les appareils et ajoute chaque appareil dans un p
    appliances.forEach((appliance) => {
        const applianceP = document.createElement('p');
        applianceP.textContent = appliance;
        appliancesList.appendChild(applianceP);
        // Ajouter un event listener sur chaque appareil
        applianceP.addEventListener('click', (e) => {
            onSelectedAppliance(appliance);
            handleSelectedList(e.target,'appliance-container', 'appliance')
        });
    });

    // Ajout des listes aux boutons
    btnIngredients.appendChild(ingredientsList);
    btnUstensils.appendChild(ustensilsList);
    btnAppliance.appendChild(appliancesList);


    // Ajouter des écouteurs d'événements pour les boutons
    btnIngredients.addEventListener('click', (e) => {
        console.log(e.target)
        if(e.target.tagName === 'SPAN'){
            toggleDisplay(btnIngredients, ingredientsList);
        }
    });

    btnUstensils.addEventListener('click', (e) => {
        if(e.target.tagName === 'SPAN'){
            toggleDisplay(btnUstensils, ustensilsList);
        }
    });

    btnAppliance.addEventListener('click', (e) => {
        if(e.target.tagName === 'SPAN'){
            toggleDisplay(btnAppliance, appliancesList);
        }
    });

    // Ajouter un écouteur d'événements global pour détecter les clics à l'extérieur
    document.addEventListener('click', handleIconClick);
    document.addEventListener('click', handleClickOutside);
}

//
function toggleDisplay(button, element) {
    const allButtons = document.querySelectorAll('.category-button');
    const allLists = document.querySelectorAll('.list-group');

    allButtons.forEach(btn => {
        if(btn === button){
            btn.classList.toggle('open')        
        } else {
            btn.classList.remove('open')        
        }
    })
    

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
        } else {
            button.classList.remove('open')
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
}

export const removeSelectedItem = (containerId, element) => {
    const selectedItems = document.querySelectorAll(`#${containerId} .container-list-btn p`)
    const listGroup = document.querySelectorAll(`#${containerId} .list-group p`)
    selectedItems.forEach(e => {
        if(e.innerText === element){
            e.remove()
        }
    })
    listGroup.forEach(e => {
        if(e.innerText === element){
            e.style.display = 'block'
        }
    })
}

export const hideNoRecipeElements = (recipes) => {

    const hideElementsInList = (elements, list) => {
        const listItemContainer = document.querySelectorAll('.list-item-container')
        const selectedListItems = Array.from(listItemContainer).map(e => e.innerText)
        elements.forEach(e => {
            if(!list.includes(e.innerText) || selectedListItems.includes(e.innerText)){
                e.style.display = 'none'
            } else {
                e.style.display = 'block'
            }
        })
    }

    const ingredients = recipes.map(r => r.ingredients.map(i => i.ingredient.toLowerCase())).flat()
    const appliances = recipes.map(r => r.appliance.toLowerCase())
    const ustensiles = recipes.map(r => r.ustensils.map(u => u.toLowerCase())).flat()


    hideElementsInList(document.querySelectorAll('#ingredient-list p'), ingredients)
    hideElementsInList(document.querySelectorAll('#appliance-list p'), appliances)
    hideElementsInList(document.querySelectorAll('#ustensil-list p'), ustensiles)
}



