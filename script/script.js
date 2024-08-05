let selectedIngredients = []
let selectedUstensils = []
let selectedApplicances = []

let recipes = []

// Fonction pour récupérer les recettes
async function getRecipes() {
    const response = await fetch('data/recipes.json');
    recipes = await response.json();
    displayRecipes(recipes);
    displaySearch(recipes, onSelectedIngredient, onSelectedUstensil, onSelectedApplicance);
}

const addElementToSelectedContainer = (element, onDelete) => {
    const selectedContainer = document.querySelector('.selected-container')
    const elementLi = document.createElement('li')
    elementLi.innerHTML = element
    selectedContainer.appendChild(elementLi)

    elementLi.addEventListener('click', () => {
        onDelete()
        elementLi.remove()
        filterRecipes()
    })
}

const onSelectedIngredient = (ingredient) => {
    selectedIngredients.push(ingredient)
    addElementToSelectedContainer(ingredient, () => {
        selectedIngredients = selectedIngredients.filter(ing => ing !== ingredient)
    })
    filterRecipes()
}

const onSelectedUstensil = (ustensil) => {
    selectedUstensils.push(ustensil)
    addElementToSelectedContainer(ustensil, () => {
        selectedUstensils = selectedUstensils.filter(ust => ust !== ustensil)
    })    
    filterRecipes()
}

const onSelectedApplicance = (appliance) => {
    selectedApplicances.push(appliance)
    addElementToSelectedContainer(appliance, () => {
        selectedApplicances = selectedApplicances.filter(app => app !== appliance)
    })
    filterRecipes()
}

const filterByIngredient = (recipe) => {
    return recipe
        .ingredients
        .filter(({ingredient}) => selectedIngredients.includes(ingredient)).length === selectedIngredients.length
}

const filterByUstensil = (recipe) => {
    return recipe
    .ustensils
    .filter((ustensil) => selectedUstensils.includes(ustensil)).length === selectedUstensils.length
}

const filterByAppliance = (recipe) => {
    if(selectedApplicances.length === 0){
        return true
    }
    return selectedApplicances.includes(recipe.appliance)
}

const filterBySearch = (recipe) => {
    //TODO: Filtrer les recettes dont le titre ou les ingrédients contiennent l'élément recherché
    
    return true
}

const filterRecipes = () => {
    const filteredRecipes = recipes.filter((recipe) => {
        return filterByIngredient(recipe) 
            && filterByUstensil(recipe)
            && filterByAppliance(recipe)
            && filterBySearch(recipe)
    })
    displayRecipes(filteredRecipes)

}



// Fonction d'initialisation
const init = async () => {
    await getRecipes();
};

// Appel de la fonction d'initialisation
init();

