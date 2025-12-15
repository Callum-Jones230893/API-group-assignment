readMoreBtn.addEventListener("click", () => {
  ingredientDiv.classList.toggle("hide");
})

function printInfo(drink) {
  ingredientDiv.classList.add("hide")
  ingredientDiv.innerHTML = ""
  let ingredientList = document.createElement("ul")

  Object.keys(drink).forEach(key => {
    if (key.startsWith("strIngredient") && drink[key]) {
      let ingredientIndex = key.replace("strIngredient", "")
      let drinkIngredient = drink[key]
      let drinkMeasurement = drink[`strMeasure${ingredientIndex}`]
      let drinkInfo = document.createElement("li")
      drinkInfo.textContent = drinkMeasurement ? `${drinkMeasurement} : ${drinkIngredient}` : drinkIngredient;
      ingredientList.appendChild(drinkInfo)

    }
  })
  ingredientDiv.appendChild(ingredientList);
}

readMoreBtn.classList.remove("hide");


  <div class="drink-section">
    <button class="button" id="drink-button">Find your drink!</button>
    <div class="results" id="drink"></div>
    <button id="read-more-btn" class="hide">Show ingredients</button>
    <div id="ingredient" class="hide"></div>
  </div>