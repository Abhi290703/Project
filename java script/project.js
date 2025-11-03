    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(response => response.json())
      .then(data => {
        const categories = data.categories;
        const row = document.getElementById("categories-row");
        row.innerHTML = "";
        categories.forEach(cat => {
          const col = document.createElement("div");
          col.className = "col-sm-6 col-md-4 col-lg-3";
          col.innerHTML = `
            <div class="category-card mb-4 shadow-sm">
              <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}" class="category-img">
              <span class="category-label">${cat.strCategory.toUpperCase()}</span>
            </div>
          `;
          row.appendChild(col);
        });
      });