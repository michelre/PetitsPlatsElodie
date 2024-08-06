let selectedIngredients = [];
let selectedUstensils = [];
let selectedApplicances = [];
let recipes = [];

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

const addElementToSelectedContainer = (element, onDelete) => {
  const selectedContainer = document.querySelector(".selected-container");
  const elementLi = document.createElement("li");
  elementLi.innerHTML = element;
  //ajouter une icon au li 
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-xmark";
  elementLi.appendChild(deleteIcon);
  //ajouter une fonction au click de l'icone
  deleteIcon.addEventListener("click", () => {
    onDelete();
    elementLi.remove();
  });

  selectedContainer.appendChild(elementLi);

  elementLi.addEventListener("click", () => {
    onDelete();
    elementLi.remove();
    filterRecipes();
  });
};

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
  selectedApplicances.push(appliance);
  addElementToSelectedContainer(appliance, () => {
    selectedApplicances = selectedApplicances.filter(
      (app) => app !== appliance
    );
  });
  filterRecipes();
};
// filtre les ingredients par ingredients
const filterByIngredient = (recipe) => {
  return selectedIngredients.every((ingredient) =>
    recipe.ingredients.some(({ ingredient: ing }) => ing === ingredient)
  );
};
// filtre les ingredients par ustensils
const filterByUstensil = (recipe) => {
  return selectedUstensils.every((ustensil) =>
    recipe.ustensils.includes(ustensil)
  );
};
// filtre les ingredients par appareil
const filterByAppliance = (recipe) => {
  return (
    selectedApplicances.length === 0 ||
    selectedApplicances.includes(recipe.appliance)
  );
};

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

document.querySelector(".search-bar").addEventListener("input", filterRecipes);

const init = async () => {
  await getRecipes();
};

init();
