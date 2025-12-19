const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
const listUrl = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
const randomIdUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
const results = document.querySelector("#drink");
const readMoreBtnDrink = document.querySelector("#read-more-btn");
const ingredientDiv = document.querySelector("#ingredient");
const section = document.querySelector("#drink-section");
const drinkBtn = document.querySelector("#drink-button");
const searchInput = document.querySelector("#drink-search");
const ingredientBtn = document.querySelector("#ingredient-btn");
const favorites = "favoriteDrink";
const favorited = document.querySelector("#favorited-drinks");
const favoriteBtn = document.querySelector("#fav-drink-btn");

let currentFavorite = null;

function getFavoritesDrink() {
  return JSON.parse(localStorage.getItem(favorites)) || [];
}
function saveFavorite(favorite) {
  localStorage.setItem(favorites, JSON.stringify(favorite));
}
function isFavorite(id) {
  return getFavoritesDrink().some(drink => drink.id === id);
}
function toggle(drink) {
  let favoriteDrink = getFavoritesDrink();

  if (isFavorite(drink.idDrink)) {
    favoriteDrink = favoriteDrink.filter(fav => fav.id !== drink.idDrink);
  } else {
    favoriteDrink.push({
      id: drink.idDrink,
      name: drink.strDrink,
    });
  }
  saveFavorite(favoriteDrink);
}

//populating the list
window.onload = async function () {
  if (favorited) {
    const favoriteList = getFavoritesDrink();
    if (favoriteList.length === 0) {
      favorited.innerHTML = "<li>No favorite drinks yet</li>";
      return;
    }

    if (favoriteList.length > 0) {
      favoriteList.forEach(drink => {
        let drinkInfo = document.createElement("li");
        drinkInfo.classList.add(`${drink.id}`);
        drinkInfo.textContent = drink.name;
        drinkInfo.style.cursor = "pointer";
        favorited?.appendChild(drinkInfo);

        drinkInfo.addEventListener("click", e => {
          if (currentFavorite === drink.id) {
            section.classList.add("hide");
            currentFavorite = null;
          } else {
            section.classList.remove("hide");
            favoritedDrink(drink.id);
            currentFavorite = drink.id;
          }
        });
      });
    }
  }
  try {
    const response = await fetch(listUrl);

    if (!response.ok) {
      throw new Error("Please try again later.");
    }

    const data = await response.json();

    data.drinks.forEach(index => {
      const selection = document.createElement("option");
      selection.value = index.strIngredient1;
      selection.textContent = index.strIngredient1;
      ingredientBtn.appendChild(selection);
    });
  } catch (error) {
    results.innerHTML = `<div>${error.message}</div>`;
  }
};

//fetching first db
const findDrink = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Please try again later.");
    }

    const data = await response.json();
    const drink = data.drinks[0];
    readMoreBtnDrink.classList.remove("hide");
    favoriteBtn.classList.remove("hide");

    results.innerHTML = `
    <img src="${drink.strDrinkThumb}">
    <h3>${drink.strDrink}</h3>
    <p>${drink.strCategory}, ${drink.strAlcoholic}</p>`;

    printInfo(drink);
    favorite(drink);
  } catch (error) {
    results.innerHTML = `<div>${error.message}</div>`;
  }
};
//searching for ingredient
const searchIngredient = async () => {
  try {
    const search = ingredientBtn.value;
    const response = await fetch(searchUrl + search);

    if (!response.ok) {
      throw new Error("Please try again later.");
    }
    const data = await response.json();
    readMoreBtnDrink.classList.remove("hide");
    favoriteBtn.classList.remove("hide");

    //randomizing
    const randomize = async () => {
      const randomId = Math.floor(Math.random() * data.drinks.length);
      const drinkId = data.drinks[randomId].idDrink;
      const randomResponse = await fetch(randomIdUrl + drinkId);

      if (!randomResponse.ok) {
        throw new Error("Please try again later.");
      }

      const randomData = await randomResponse.json();
      // console.log(randomId)
      const drink = randomData.drinks[0];

      results.innerHTML = `
      <img src="${drink.strDrinkThumb}">
      <h3>${drink.strDrink}</h3>
      <p>${drink.strCategory}, ${drink.strAlcoholic}</p>`;

      printInfo(drink);
      favorite(drink);
    };
    randomize();
  } catch (error) {
    results.innerHTML = `<div>${error.message}</div>`;
    console.log(error);
  }
};

ingredientBtn.addEventListener(`change`, () => {
  searchIngredient();
});

drinkBtn.addEventListener(`click`, () => {
  findDrink();
});

readMoreBtnDrink.addEventListener("click", () => {
  ingredientDiv.classList.toggle("hide");
});

function favorite(drink) {
  const favoriteBtn = document.querySelector("#fav-drink-btn");
  if (!favoriteBtn) return;

  favoriteBtn.textContent = isFavorite(drink.idDrink) ? "Remove from Favorites" : "Add to Favorites";
  favoriteBtn.onclick = () => {
    toggle(drink);
    favoriteBtn.textContent = isFavorite(drink.idDrink) ? "Remove from Favorites" : "Add to Favorites";
  };
}

const favoritedDrink = async id => {
  try {
    const response = await fetch(randomIdUrl + id);

    if (!response.ok) {
      throw new Error("Please try again later.");
    }

    const data = await response.json();
    const drink = data.drinks[0];
    readMoreBtnDrink.classList.remove("hide");
    favoriteBtn.classList.remove("hide");

    results.innerHTML = `
    <img src="${drink.strDrinkThumb}">
    <h3>${drink.strDrink}</h3>
    <p>${drink.strCategory}, ${drink.strAlcoholic}</p>`;

    printInfo(drink);
    favorite(drink);
  } catch (error) {
    results.innerHTML = `<div>${error.message}</div>`;
  }
};

function printInfo(drink) {
  ingredientDiv.classList.add("hide");
  ingredientDiv.innerHTML = "";
  let ingredientList = document.createElement("ul");
  ingredientList.classList.add("ingredient-info");

  Object.keys(drink).forEach(key => {
    if (key.startsWith("strIngredient") && drink[key]) {
      let ingredientIndex = key.replace("strIngredient", "");
      let drinkIngredient = drink[key];
      let drinkMeasurement = drink[`strMeasure${ingredientIndex}`];
      let drinkInfo = document.createElement("li");
      drinkInfo.textContent = drinkMeasurement ? `${drinkMeasurement} : ${drinkIngredient}` : drinkIngredient;
      ingredientList.appendChild(drinkInfo);
    }
  });
  ingredientDiv.appendChild(ingredientList);
}
