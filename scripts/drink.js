const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const results = document.querySelector(".result");

const findDrink = async () => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Please try again later.")

    } else {
      results.textContent = ""

      const data = await response.json()
      console.log(data)
      return (data)
    }
  } catch (error) {
    results.textContent = ""
  }
}

findDrink()

Object.keys(drink).forEach(key => {
  if (key.startsWith("strIngredient") && drink[key]) {
    let ingredient = document.createElement("li")
    ingredient.
 }})