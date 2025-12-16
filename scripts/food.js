const list = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error!");
      }
      return response.json();
    })
    .then(data => {
      console.log(`Categories: `, data);

      data.meals.forEach(item => {
        let listItem = document.createElement("option");
        listItem.value = item.strCategory.toLowerCase();
        listItem.text = item.strCategory;
        listItem.class = "list-item";
        document.querySelector("#categoryList").appendChild(listItem);
      });
    })
    .catch(error => {
      console.error("Error: ", error);
    });
};
list();

const fetchCategory = category => {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error!");
      }
      return response.json();
    })
    .then(data => {
      const randomFood = data.meals[Math.floor(Math.random() * data.meals.length)];
      return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomFood.idMeal}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error!");
      }
      return response.json();
    })
    .then(data => {
      displayFood(data.meals[0]);
    })
    .catch(error => {
      console.error("Error: ", error);
    });
};

const fetchRecipes = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error!");
      }
      return response.json();
    })
    .then(data => {
      console.log(`Food API: `, data);
      displayFood(data.meals[0]);
    })
    .catch(error => {
      console.error("Error: ", error);
    });
};

const displayFood = meal => {
  const image = document.querySelector("#food-image");
  image.src = meal.strMealThumb;
  image.height = "150";

  document.querySelector("#food-card__title").textContent = meal.strMeal;
  document.querySelector("#food-origin").textContent = `Culinary origin: ${meal.strArea}`;

  readMoreBtn.classList.remove("hide");

  const recipe = document.querySelector("#recipe");
  recipe.innerHTML = "";

  const ingredientsList = [];

  Object.keys(meal).forEach(key => {
    if (key.startsWith("strIngredient") && meal[key]) {
      const ingredient = meal[key];
      const index = key.replace("strIngredient", "");
      const measurement = meal[`strMeasure${index}`] || "";
      ingredientsList.push(`${ingredient}: ${measurement}`);
    }
  });

  const instructions = document.createElement("div");
  instructions.innerHTML = `
  <ul class="info" id="ingredients-list"></ul>
  <div class="info" id="steps">${meal.strInstructions}</div>
  `;
  recipe.appendChild(instructions);

  const ul = document.querySelector("#ingredients-list");
  ingredientsList.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
};

const readMoreBtn = document.querySelector("#food-card #read-more-btn");
readMoreBtn.onclick = () => {
  document.querySelector("#recipe").classList.toggle("hide");
};

const selectCategory = document.querySelector("#categoryList");
selectCategory.addEventListener("change", e => {
  const selected = e.target.value;
  if (!selected) return;
  fetchCategory(selected);
  document.querySelector("#recipe").classList.add("hide");
});

const foodBtn = document.querySelector("#food-btn");
foodBtn.onclick = () => {
  selectCategory.value = "";
  fetchRecipes();
  document.querySelector("#recipe").classList.add("hide");
};
