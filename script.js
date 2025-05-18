const recipes = [
  {
    name: "Cupcakes",
    image: "images/cupcakes.jpg",
    ingredients: "Flour, sugar, eggs, butter, vanilla, baking powder, milk",
    steps: "1. Preheat oven. 2. Mix ingredients. 3. Pour into cupcake molds. 4. Bake for 20 minutes."
  },
  {
    name: "Cookies",
    image: "images/cookies.jpg",
    ingredients: "Flour, sugar, butter, eggs, chocolate chips, vanilla, baking soda",
    steps: "1. Mix ingredients. 2. Scoop onto tray. 3. Bake for 10-12 minutes."
  },
  {
    name: "Strawberry Shortcake",
    image: "images/strawberry-shortcake.jpg",
    ingredients: "Shortcake biscuits, strawberries, sugar, whipped cream",
    steps: "1. Slice strawberries and mix with sugar. 2. Layer shortcake, strawberries, and cream. 3. Serve chilled."
  }
];

// Render recipe cards
function renderRecipes(filteredRecipes) {
  const container = document.getElementById("recipeList");
  if (!container) return;

  container.innerHTML = ""; // Clear previous content

  filteredRecipes.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <a href="recipe.html?id=${index}">
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-img"/>
        <h3>${recipe.name}</h3>
      </a>
      <button onclick="toggleFavourite(${index})">
    ${isFavourite(index) ? '❤️ Remove' : '🤍 Favourite'}
  </button>
    `;
    container.appendChild(card);
  });
}

// Recipe detail page
function renderRecipeDetail() {
  const container = document.getElementById("recipeDetail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  if (recipes[id]) {
    const recipe = recipes[id];
    container.innerHTML = `
      <h2>${recipe.name}</h2>
      <img src="${recipe.image}" alt="${recipe.name}" />
      <h4>Ingredients</h4>
      <p>${recipe.ingredients}</p>
      <h4>Steps</h4>
      <p>${recipe.steps}</p>
    `;
  } else {
    container.innerHTML = "<p>Recipe not found.</p>";
  }
}

// Filter on search input
function setupSearch() {
  const searchInput = document.getElementById("searchBar");
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query)
    );
    renderRecipes(filtered);
  });
}

// Page detection and setup
if (document.getElementById("recipeList")) {
  renderRecipes(recipes); // Show all
  setupSearch();          // Enable searching
}

if (document.getElementById("recipeDetail")) {
  renderRecipeDetail();   // Show individual recipe
}
function getFavourites() {
  return JSON.parse(localStorage.getItem("favourites")) || [];
}

function isFavourite(id) {
  const favs = getFavourites();
  return favs.includes(id);
}

function toggleFavourite(id) {
  let favs = getFavourites();
  if (favs.includes(id)) {
    favs = favs.filter(favId => favId !== id);
  } else {
    favs.push(id);
  }
  localStorage.setItem("favourites", JSON.stringify(favs));
  renderRecipes(recipes); // Re-render to update buttons
}
function renderFavourites() {
  const container = document.getElementById("recipeList");
  if (!container) return;

  const favIds = getFavourites();
  const favRecipes = favIds.map(id => recipes[id]);

  if (favRecipes.length === 0) {
    container.innerHTML = "<p>No favourite recipes yet.</p>";
    return;
  }

  container.innerHTML = "";
  favRecipes.forEach((recipe, index) => {
    const realIndex = favIds[index];
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <a href="recipe.html?id=${realIndex}">
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-img"/>
        <h3>${recipe.name}</h3>
      </a>
      <button onclick="toggleFavourite(${realIndex})">❤️ Remove</button>
    `;
    container.appendChild(card);
  });
}
if (window.location.pathname.includes("favourites.html")) {
  renderFavourites();
}
