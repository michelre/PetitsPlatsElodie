import {displayRecipes} from './recipe.js'
import {displaySearch, removeSelectedItem} from './search.js'

let selectedIngredients = [];
let selectedUstensils = [];
let selectedAppliances = [];
let recipes = [];

// Fonction pour récupérer les recettes depuis un fichier JSON
async function getRecipes() {
  const response = await fetch("data/recipes.json");
  recipes = await response.json();
  displayRecipes(recipes);
  displaySearch(
    recipes,
    onSelectedIngredient,
    onSelectedUstensil,
    onSelectedAppliance,
    onDeleteItem)}

// Ajouter un élément sélectionné dans le conteneur des éléments sélectionnés
const addElementToSelectedContainer = (element, onDelete) => {
  const selectedContainer = document.querySelector(".selected-container");
  const elementLi = document.createElement("li");
  elementLi.innerHTML = element;
  // Ajouter une icône de suppression au li
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-xmark";
  elementLi.appendChild(deleteIcon);
  //ajouter le li dans le container
  selectedContainer.appendChild(elementLi);
  //ajouter une fonction au clic du li
  elementLi.addEventListener("click", () => {
    onDelete();
    elementLi.remove();
    filterRecipes();// Refiltrer les recettes après suppression
  });
};

//ajouter l'element selectionné dans le container de l'input
const onSelectedIngredient = (ingredient) => {  
  selectedIngredients.push(ingredient);
  addElementToSelectedContainer(ingredient, () => {
    selectedIngredients = selectedIngredients.filter(
      (ing) => ing !== ingredient
    );
    removeSelectedItem('ingredient', ingredient)
  });
  filterRecipes();
};

const onSelectedUstensil = (ustensil) => {
  selectedUstensils.push(ustensil);
  addElementToSelectedContainer(ustensil, () => {
    selectedUstensils = selectedUstensils.filter((ust) => ust !== ustensil);
    removeSelectedItem('ustensil', ustensil)
  });
  filterRecipes();
};

const onSelectedAppliance = (appliance) => {
  selectedAppliances.push(appliance)
  addElementToSelectedContainer(appliance, () => {
      selectedAppliances = selectedAppliances.filter(app => app !== appliance)
      removeSelectedItem('appliance', appliance)
  })
  filterRecipes()
}




const onDeleteItem = (type, item) => {
  if (type === 'ingredient') {
    selectedIngredients = selectedIngredients.filter(i => i !== item);
  } else if (type === 'ustensil') {
    selectedUstensils = selectedUstensils.filter(u => u !== item);
  } else if (type === 'appliance') {
    selectedAppliances = selectedAppliances.filter(a => a !== item);
  }

  filterRecipes();

  const selectedElementsList = document.querySelectorAll('.selected-container li');
  selectedElementsList.forEach(e => {
    if (e.innerText === item) {
      e.remove();
    }
  });
};





//filtrage  des recttes depuis l'input de chaque boutons
const filterBySearchInput = (type) => {
  let searchInput;

  // Obtenir la valeur de l'input selon le type
  if (type === 'ingredient') {
      searchInput = document.getElementById('ingredient-search-input').value.toLowerCase();
  } else if (type === 'ustensil') {
      searchInput = document.getElementById('ustensil-search-input').value.toLowerCase();
  } else if (type === 'appliance') {
      searchInput = document.getElementById('appliance-search-input').value.toLowerCase();
  }

  // Si moins de 3 caractères, afficher toutes les options
  if (!searchInput || searchInput.length < 3) {
      document.querySelectorAll(`.list-group p`).forEach(item => {
          item.style.display = 'block';
      });
      return;
  }

  // Filtrer les éléments de la liste
  const listGroup = document.querySelectorAll(`.list-group p`);
  listGroup.forEach(item => {
      if (item.textContent.toLowerCase().includes(searchInput)) {
          item.style.display = 'block';
          //item.className = 'p-selected-input';
      } else {
          item.style.display = 'none';
      }
  });
};

//filtre les rectte par ingredient
const filterByIngredient = (recipe) => {
  const recipeIngredients = recipe.ingredients.map(({ ingredient }) => ingredient.toLowerCase());
  return selectedIngredients.every(selectedIngredient => 
    recipeIngredients.includes(selectedIngredient.toLowerCase())
  );
};
//filtre les recette par ustensil
const filterByUstensil = (recipe) => {
  const recipeUstensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
  return selectedUstensils.every(selectedUstensil => 
    recipeUstensils.includes(selectedUstensil.toLowerCase())
  );
};
//filtre les rectte par appareil
const filterByAppliance = (recipe) => {
  const recipeAppliance = recipe.appliance.toLowerCase();
  return selectedAppliances.length === 0 || 
         selectedAppliances.some(selectedAppliance => 
           selectedAppliance.toLowerCase() === recipeAppliance
         );
};

//filtrer les ingredient depuis la barre de recherche principal
const filterBySearch = (recipe) => {
  const searchInput = document.querySelector(".search-bar").value.toLowerCase();
  // Si moins de 3 caractères, ne pas filtrer par recherche textuelle
  if (searchInput.length < 3) {
    return true;
  }
  // Vérifie si le nom, les ingrédients ou la description contiennent le mot clé recherché
  const titleMatches = recipe.name.toLowerCase().includes(searchInput);
  const ingredientsMatch = recipe.ingredients.some(({ ingredient }) =>
    ingredient.toLowerCase().includes(searchInput)
  );
  const descriptionMatches = recipe.description
    .toLowerCase()
    .includes(searchInput);
  return titleMatches || ingredientsMatch || descriptionMatches;
};



const updateRecipeCount = (count) => {
  console.log('Mise à jour du compteur avec :', count);
  const recipeCountElement = document.getElementById('recipe-count');
  if (recipeCountElement) {
      recipeCountElement.innerText = ` ${count} Recettes`;
  }
};


const filterRecipes = () => {
  const filteredRecipes = recipes.filter((recipe) => {
      return (
          filterByIngredient(recipe) &&
          filterByUstensil(recipe) &&
          filterByAppliance(recipe) &&
          filterBySearch(recipe)
      );
  });
  // Mise à jour du compteur
  updateRecipeCount(filteredRecipes.length);

  // Affichage des recettes filtrées
  displayRecipes(filteredRecipes);
};


// Ajouter les événements sur les inputs 
document.getElementById('ingredient-search-input').addEventListener('input', () => filterBySearchInput('ingredient'));
document.getElementById('ustensil-search-input').addEventListener('input', () => filterBySearchInput('ustensil'));
document.getElementById('appliance-search-input').addEventListener('input', () => filterBySearchInput('appliance'));
//ecouteur d'evenement sur la barre de recherche princilpale
document.querySelector(".search-bar").addEventListener("input", filterRecipes);


const init = async () => {
  await getRecipes();
  filterRecipes();
};

init();
