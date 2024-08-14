let selectedIngredients = [];
let selectedUstensils = [];
let selectedApplicances = [];
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
    onSelectedApplicance
  );
}

// Ajouter un élément sélectionné dans le conteneur des éléments sélectionnés
const addElementToSelectedContainer = (element, onDelete) => {
  const selectedContainer = document.querySelector(".selected-container");
  const elementLi = document.createElement("li");
  elementLi.innerHTML = element;
  // Ajouter une icône de suppression au li
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-xmark";
  elementLi.appendChild(deleteIcon);

  // Ajouter une fonction au clic de l'icône de suppression
  deleteIcon.addEventListener("click", () => {
    onDelete();
    elementLi.remove();
  });

  //ajouter le li dans le container
  selectedContainer.appendChild(elementLi);
  //ajouter une fonction au clic du li
  elementLi.addEventListener("click", () => {
    onDelete();
    elementLi.remove();
    filterRecipes();// Refiltrer les recettes après suppression
  });
};

//ajouter l'element selectionné dans le container
const onSelectedIngredient = (ingredient) => {
  selectedIngredients.push(ingredient);
  addElementToSelectedContainer(ingredient, () => {
    selectedIngredients = selectedIngredients.filter(
      (ing) => ing !== ingredient
    );
  });
  filterRecipes();
};

const onSelectedUstensil = (ustensil) => {
  selectedUstensils.push(ustensil);
  addElementToSelectedContainer(ustensil, () => {
    selectedUstensils = selectedUstensils.filter((ust) => ust !== ustensil);
  });
  filterRecipes();
};

const onSelectedApplicance = (appliance) => {
  selectedApplicances.push(appliance)
  addElementToSelectedContainer(appliance, () => {
      selectedApplicances = selectedApplicances.filter(app => app !== appliance)
  })
  filterRecipes()
}

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
      } else {
          item.style.display = 'none';
      }
  });
};


// filtre les recettes par ingredients
const filterByIngredient = (recipe) => {
  return recipe
      .ingredients
      .filter(({ingredient}) => selectedIngredients.includes(ingredient)).length === selectedIngredients.length
}
// filtre les recettes par ustensils
const filterByUstensil = (recipe) => {
  return selectedUstensils.every((ustensil) =>
    recipe.ustensils.includes(ustensil)
  );
};

// filtre les recettes par appareil
const filterByAppliance = (recipe) => {
  return (
    selectedApplicances.length === 0 ||
    selectedApplicances.includes(recipe.appliance)
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

//fonction de filtre des recettes
const filterRecipes = () => {
  const filteredRecipes = recipes.filter((recipe) => {
    return (
      filterByIngredient(recipe) &&
      filterByUstensil(recipe) &&
      filterByAppliance(recipe) &&
      filterBySearch(recipe)
    );
  });
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
};

init();
