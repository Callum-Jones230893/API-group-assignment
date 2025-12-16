const apiUrl = "https://jsonfakery.com/movies/random";
const movieDisplay = document.getElementById("movie-btn");
const movieCard = document.getElementById("movie-section");
const castDiv = document.getElementById("cast");

const movieBtn = document.querySelector("#movie-btn");
const showCastBtn = document.querySelector("#show-cast-btn");
const movieResultsDiv = document.querySelector("#movie");
const imgContainer = document.querySelector(".img-container");

//FUNCTION FOR SHOWING THE MOVIE
const findMovie = async () => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }

    const movie = await response.json();
    console.log(movie.original_title);

    movieResultsDiv.innerHTML = ``; //fixed fetching bug with this. content wasn't loading, had to clear the html in between
    castDiv.innerHTML = ``;
    imgContainer.innerHTML = ``;
    showCastBtn.classList.remove("hide");

    //MOVIE TITLE
    let movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.original_title;
    movieResultsDiv.appendChild(movieTitle);

    //MOVIE POSTER
    const imgURL = movie.poster_path;
    let imageDisplay = document.createElement("img");
    imageDisplay.src = imgURL;
    movieCard.appendChild(imgContainer);
    imgContainer.appendChild(imageDisplay);

    //SYNOPSIS
    let synopsis = document.createElement("p");
    synopsis.textContent = movie.overview;
    movieResultsDiv.appendChild(synopsis);

    movieResultsDiv.appendChild(showCastBtn); //button here so it's underneth the synopsis

    //CAST BUTTON
    const castNames = movie.casts.map((cast) => cast.name);
    let castList = document.createElement("ul");
    castDiv.appendChild(castList);
    // document.querySelector("#cast").appendChild(castList);

    //FOREACH DO DISPLAY THE CAST IN A LIST
    castNames.forEach((name) => {
      let castDisplay = document.createElement("li");
      castDisplay.textContent = name;
      castList.appendChild(castDisplay);
    });

    //console.log(castDisplay);
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

//CLICK EVENT FOR MOVIE BUTTON
movieBtn.addEventListener("click", () => {
  findMovie();
});

// CLICK EVENT FOR READ MORE... BUTTON
showCastBtn.onclick = () => {
  castDiv.classList.toggle("hide");
};
