const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
const listUrl = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
const randomIdUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
const results = document.querySelector("#drink");
const readMoreBtn = document.querySelector("#read-more-btn");
const ingredientDiv = document.querySelector("#ingredient");
const drinkBtn = document.querySelector("#drink-button");
const searchInput = document.querySelector("#drink-search");
const ingredientBtn = document.querySelector("#ingredient-btn");
const favorites = "favoriteDrink";
const favorited = document.querySelector("#favorited-drinks")

function getFavorites() {
  return JSON.parse(localStorage.getItem(favorites)) || [];
}
function saveFavorite(favorite) {
  localStorage.setItem(favorites, JSON.stringify(favorite));
}
function isFavorite(id) {
  return getFavorites().some(drink => drink.id === id);
}
function toggle(drink) {
  let favoriteDrink = getFavorites();

if (isFavorite(drink.idDrink)) {
  favoriteDrink = favoriteDrink.filter(fav => fav.id !== drink.idDrink);
} else {
  favoriteDrink.push({
    id: drink.idDrink,
    name: drink.strDrink
  })
}
saveFavorite(favoriteDrink);
}

//populating the list
window.onload = async function () {
  const favoriteList = getFavorites()

  if (favoriteList.length > 0) {
  favoriteList.forEach(drink => {
  let drinkInfo = document.createElement("li")
  // drinkInfo.classList.add("favorite-details")
  drinkInfo.textContent = drink.name
  favorited.appendChild(drinkInfo)

  drinkInfo.addEventListener("click", () => {
    favoritedDrink(drink.id)
  })
  })
} 
  try {
    const response = await fetch(listUrl)

    if (!response.ok) {
      throw new Error("Please try again later.")
    }

    const data = await response.json()

    data.drinks.forEach(index => {
      const selection = document.createElement("option");
      selection.value = index.strIngredient1;
      selection.textContent = index.strIngredient1;
      ingredientBtn.appendChild(selection)
    })

  } catch (error) {
    results.innerHTML = `<div>${error.message}</div>`
  }
}

//fetching first db
const findDrink = async () => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Please try again later.");
    }

    const data = await response.json();
    const drink = data.drinks[0];
    readMoreBtn.classList.remove("hide");

    results.innerHTML = `
    <h2>${drink.strDrink}</h2>
    <h3>${drink.strCategory}, ${drink.strAlcoholic}</h3>
    <img src="${drink.strDrinkThumb}">
    <button id="favorite-btn"></button>`

    printInfo(drink)
    favorite(drink);

  } catch (error) {
    results.innerHTML = `<div>${error.message}</div>`
  }
}
//searching for ingredient
const searchIngredient = async () => {
  try {
    const search = ingredientBtn.value
    const response = await fetch(searchUrl + search)

    if (!response.ok) {
      throw new Error("Please try again later.")
    }
    const data = await response.json();
    readMoreBtn.classList.remove("hide");

    //randomizing
    const randomize = async () => {
      const randomId = Math.floor(Math.random() * data.drinks.length)
      const drinkId = data.drinks[randomId].idDrink;
      const randomResponse = await fetch(randomIdUrl + drinkId)

      if (!randomResponse.ok) {
        throw new Error("Please try again later.")
      }

      const randomData = await randomResponse.json();
      // console.log(randomId)
      const drink = randomData.drinks[0];

      results.innerHTML = `
      <h2>${drink.strDrink}</h2>
      <h3>${drink.strCategory}, ${drink.strAlcoholic}</h3>
      <img src="${drink.strDrinkThumb}">
      <button id="favorite-btn"></button>`

      printInfo(drink)
      favorite(drink);
    }
    randomize();


  } catch (error) {
    results.innerHTML = `<div>${error.message}</div>`
    console.log(error)
  }
}

ingredientBtn.addEventListener(`change`, () => {
  searchIngredient()
})

drinkBtn.addEventListener(`click`, () => {
  findDrink()
})

readMoreBtn.addEventListener("click", () => {
  ingredientDiv.classList.toggle("hide");
})

function favorite(drink) {
  const favoriteBtn = document.querySelector("#favorite-btn");
  if (!favoriteBtn) return;

  favoriteBtn.textContent = isFavorite(drink.idDrink)
    ? "Remove from Favorites"
    : "Add to Favorites";

  favoriteBtn.onclick = () => {
    toggle(drink);

    favoriteBtn.textContent = isFavorite(drink.idDrink)
      ? "Remove from Favorites"
      : "Add to Favorites";
  };
}

const favoritedDrink = async (id) => {
  try {
    const response = await fetch(randomIdUrl + id)

    if (!response.ok) {
      throw new Error("Please try again later.");
    }

    const data = await response.json();
    const drink = data.drinks[0];
    readMoreBtn.classList.remove("hide");

    results.innerHTML = `
    <h2>${drink.strDrink}</h2>
    <h3>${drink.strCategory}, ${drink.strAlcoholic}</h3>
    <img src="${drink.strDrinkThumb}">
    <button id="favorite-btn"></button>`

    printInfo(drink)
    favorite(drink);

  } catch (error) {
    results.innerHTML = `<div>${error.message}</div>`
  }
}

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