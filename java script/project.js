// Get reference to the container where you want to show categories
const categoriesContainer = document.getElementById("categoriesContainer");

// Fetch categories from TheMealDB API
fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then(response => response.json())
  .then(data => {
    const categories = data.categories;

    // Loop through each category and create Bootstrap cards
    categories.forEach(cat => {
      const col = document.createElement("div");
      col.className = "col-6 col-md-4 col-lg-3 text-center";

      col.innerHTML = `
        <div class="card border-0 shadow-sm h-100">
          <img src="${cat.strCategoryThumb}" class="card-img-top" alt="${cat.strCategory}">
          <div class="card-body">
            <h6 class="card-title fw-bold">${cat.strCategory}</h6>
            <p class="card-text small text-muted">${cat.strCategoryDescription.substring(0, 60)}...</p>
          </div>
        </div>
      `;
      categoriesContainer.appendChild(col);
    });
  })
  .catch(error => {
    console.error("Error fetching categories:", error);
    categoriesContainer.innerHTML = `<p class="text-danger">Failed to load categories. Please try again later.</p>`;
  });
