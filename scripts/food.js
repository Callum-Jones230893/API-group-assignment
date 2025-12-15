let foodItem;

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

      const image = document.querySelector("#food-image");
      image.src = data.meals[0].strMealThumb;
      image.height = "150";

      document.querySelector("#food-card__title").textContent = data.meals[0].strMeal;
      document.querySelector("#food-origin").textContent = `Culinary origin: ${data.meals[0].strArea}`;
      readMoreBtn.classList.remove("hide");

      localStorage.setItem("last food", data.meals[0].strMeal);

      const meal = data.meals[0];
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
      <div class="info" id="steps">${data.meals[0].strInstructions}</div>
      `;
      document.querySelector("#recipe").appendChild(instructions);

      ingredientsList.forEach(item => {
        let listItem = document.createElement("li");
        listItem.textContent = item;
        document.querySelector("#ingredients-list").appendChild(listItem);
      });
    });
};

const readMoreBtn = document.querySelector("#food-card #read-more-btn");
readMoreBtn.onclick = () => {
  document.querySelector("#recipe").classList.toggle("hide");
};

const foodBtn = document.querySelector("#food-btn");
foodBtn.onclick = () => {
  fetchRecipes();
  document.querySelector("#recipe").classList.add("hide");
};
