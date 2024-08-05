// Fonction pour récupérer les recettes
async function getRecipes() {
    const response = await fetch('data/recipes.json');
    const recipes = await response.json();
    console.log(recipes);
    displayRecipes(recipes);
    displaySearch(recipes);
}



// Fonction d'initialisation
const init = async () => {
    await getRecipes();
};

// Appel de la fonction d'initialisation
init();

