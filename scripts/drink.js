const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const results = document.querySelector("#drink");
const readMoreBtn = document.querySelector("#read-more-btn");
const ingredientDiv = document.querySelector("#ingredient");
const drinkBtn = document.querySelector("#drink-button")

const findDrink = async () => {
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error("Please try again later.")
    } 

    const data = await response.json()
    const drink = data.drinks[0]
    readMoreBtn.classList.remove("hide");

    results.innerHTML = `
    <h2>${drink.strDrink}</h2>
    <h3>${drink.strCategory}, ${drink.strAlcoholic}</h3>
    <img src="${drink.strDrinkThumb}">`

    ingredientDiv.classList.add("hide")
    
    let ingredientList = document.createElement("ul")

    Object.keys(drink).forEach(key => {
      if (key.startsWith("strIngredient") && drink[key]) {
        let ingredientIndex = key.replace("strIngredient", "")
        let drinkIngredient = drink[key]
        let drinkMeasurement = drink[`strMeasure${ingredientIndex}`]
        let drinkInfo = document.createElement("li")

        drinkInfo.textContent = `${drinkMeasurement} : ${drinkIngredient}`
        ingredientList.appendChild(drinkInfo)
      } 
    })

    ingredientDiv.appendChild(ingredientList); 

  } catch (error) {
    results.innerHTML = `<div>Please try again.</div>`
  }
}

drinkBtn.addEventListener(`click`, () => {
  findDrink()
})

readMoreBtn.addEventListener("click", () => {
  ingredientDiv.classList.toggle("hide");
})

