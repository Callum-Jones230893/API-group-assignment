const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const results = document.querySelector(".results");

const findDrink = async () => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Please try again later.")

    } 
      results.textContent = "Loading"

      const data = await response.json()
      const drink = data.drinks[0]
      results.innerHTML = `<h2>${drink.strDrink}</h2>`
      
      let ul = document.createElement("ul")

      Object.keys(drink).forEach(key => {
        if (key.startsWith("strIngredient") && drink[key]) {
          let mainKey = key.replace("strIngredient", "")
          let drinkIngredient = drink[key]
          let drinkMeasurement = drink[`strMeasure${mainKey}`]
          let drinkInfo = document.createElement("li")
          drinkInfo.textContent = `${drinkMeasurement}${drinkIngredient ? `${drinkIngredient}` : ""}`
          ul.appendChild(drinkInfo)
        } 
      })
    results.appendChild(ul)

  } catch (error){
    results.innerHTML = `<div class ="unlucky"> unlucky </div>`
  }
}

findDrink() 