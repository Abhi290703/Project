fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then(response => response.json())
  .then(data => {
    products = data.categories;
    console.log(products);
    document.getElementById("mainCategories");

    // Clear before adding
    mainCategories.innerHTML = "";

    // Add Tailwind grid layout
    mainCategories.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6";

    products.forEach(product => {
      mainCategories.innerHTML += `
        <div class="bg-white rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ">
          <img src="${product.strCategoryThumb}" alt="${product.strCategory}" class="w-full h-40 object-cover">
          <div class="p-3 text-center ">
            <h4 class="absolute top-2 right-2 bg-orange-400 text-white text-xs px-2 py-1 rounded-full shadow-md">
            ${product.strCategory}</h4>
          </div>
        </div>`;
    });
  })
  .catch(error => console.log("Error: data is not available", error));

    // Elements
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const mainCategories = document.getElementById("mainCategories");

    // Function to search meal by name
    function searchMeal(foodName) {
    if (!foodName.trim()) return; // stop if empty

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(response => response.json())
        .then(data => {
        meals = data.meals;
        mainCategories.innerHTML = ""; // clear old content

        if (!meals) {
            mainCategories.innerHTML = `
            <p class="text-center text-gray-600 text-xl col-span-full">No meals found </p>`;
            return;
        }

        // Grid layout
        mainCategories.className =
            "flex flex-wrap justify-evenly gap-3 p-3";

        meals.forEach(meal => {
            mainCategories.innerHTML += `
            <div class="relative bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 object-fill">
                <div class="absolute top-2 right-2 bg-orange-400 rounded-full bg-opacity-50 text-white text-center p-4 mt-2">
                <h4 class="text-sm font-semibold">${meal.strMeal}</h4>
                </div>
            </div>
            `;
        });
        })
        .catch(err => console.log("Error:", err));
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
