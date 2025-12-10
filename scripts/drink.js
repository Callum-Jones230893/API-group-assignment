const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const results = document.querySelector("#drink");

const findDrink = async () => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Please try again later.")

    } 
    results.textContent = "Loading"

    const data = await response.json()
    const drink = data.drinks[0]
    results.innerHTML = `
    <h2>${drink.strDrink}</h2>
    <img src="${drink.strDrinkThumb}">`
    
    let ingredientList = document.createElement("ul")

    Object.keys(drink).forEach(key => {
      if (key.startsWith("strIngredient") && drink[key]) {
        let mainKey = key.replace("strIngredient", "")
        let drinkIngredient = drink[key]
        let drinkMeasurement = drink[`strMeasure${mainKey}`]
        let drinkInfo = document.createElement("li")

        drinkInfo.textContent = `${drinkMeasurement ? `${drinkMeasurement}` : ""}${drinkIngredient ? `${drinkIngredient}` : ""}`
        ingredientList.appendChild(drinkInfo)
      } 
    })
    results.appendChild(ingredientList)
    
  } catch (error){
    results.innerHTML = `<div> Please try again.</div>`
  }
}

let drinkBtn = document.querySelector("#drink-button")

drinkBtn.addEventListener(`click`, () => {
  findDrink()
})

//add category to search for if we add search function?
//add info if alcoholic or not?