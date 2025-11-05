const mainCategories = document.getElementById("mainCategories");
const sidebar = document.getElementById("sidebar");
const menuBar = document.getElementById("menuBar");
const menuList = document.getElementById("menuList");

// Toggle sidebar visibility when clicking the menu bar
menuBar.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});

// Close menu if you click outside it
document.addEventListener("click", (event) => {
  if (!sidebar.contains(event.target) && !menuBar.contains(event.target)) {
    sidebar.classList.add("hidden");
  }
});

// Fetch and display categories
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then(res => res.json())
  .then(data => {
    const categories = data.categories;
    mainCategories.innerHTML = "";
    menuList.innerHTML = ""; // clear menu first

    mainCategories.className =
      "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6";

    categories.forEach(category => {
      // Category Cards (Main)
      mainCategories.innerHTML += `
        <div class="relative bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300 cursor-pointer"
             onclick="loadMealsByCategory('${category.strCategory}')">
          <span class="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-2 font-semibold rounded-full shadow-md">
            ${category.strCategory}
          </span>
          <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-full h-48 object-cover">
        </div>
      `;

      // Sidebar Menu Item
      menuList.innerHTML += `
        <li class="hover:bg-orange-100 rounded px-2 py-1 cursor-pointer"
            onclick="loadMealsByCategory('${category.strCategory}');
                     sidebar.classList.add('hidden');">
          ${category.strCategory}
        </li>
      `;
    });
  })
  .catch(err => console.log("Error loading categories:", err));

  function searchMeal(query) {
  if (!query.trim()) return;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      const meals = data.meals;
      mainCategories.innerHTML = "";

      if (!meals) {
        mainCategories.innerHTML = `
          <p class="text-center text-red-500 text-lg col-span-full">No meals found for "${query}"</p>
        `;
        return;
      }

      mainCategories.className =
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6";

      meals.forEach(meal => {
        mainCategories.innerHTML += `
          <div class="relative bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 object-cover">
            <div class="absolute top-2 right-2 bg-orange-400 rounded-full text-white text-center p-2">
              <h4 class="text-sm font-semibold">${meal.strMeal}</h4>
            </div>
          </div>
        `;
      });
    })
    .catch(err => console.log("Error fetching meals:", err));
}


  // Elements for click function

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// Function to load meals by category
function loadMealsByCategory(categoryName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    .then(res => res.json())
    .then(data => {
      const meals = data.meals;
      mainCategories.innerHTML = "";
      mainCategories.className =
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6";

      meals.forEach(meal => {
        mainCategories.innerHTML += `
          <div class="relative bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300" onclick='displayLastItem(${meal.idMeal})'>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 object-cover">
            <div class="absolute top-2 right-2 bg-orange-400 text-black text-center p-2">
              <h4 class="text-sm font-semibold">${meal.strMeal}</h4>
            </div>
          </div>
        `;
      });
    })
    .catch(err => console.log("Error loading meals:", err));
}

// Click event for search button
searchBtn.addEventListener("click", () => {
  const query = searchInput.value;
  searchMeal(query);
});

// Press Enter to search
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value;
    searchMeal(query);
  }
});

//  displayLastItem(meal){
//   fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+meal)
  
  
// }

