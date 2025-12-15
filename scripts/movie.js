const apiUrl = "https://jsonfakery.com/movies/random";
const movieDisplay = document.getElementById("movie-button");
const movieCard = document.querySelector("#movie-card");

//FUNCTION FOR SHOWING THE MOVIE
const findMovie = async () => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }

    const movie = await response.json();
    console.log(movie.original_title);

    movieCard.innerHTML = ``; //fixed fetching bug with this. content wasn't loading, had to clear the html in between

    //MOVIE TITLE
    let movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.original_title;
    document.querySelector("#movie-card").appendChild(movieTitle);

    //MOVIE POSTER
    const imgURL = movie.poster_path;
    let imageDisplay = document.createElement("img");
    imageDisplay.src = imgURL;
    movieCard.appendChild(imageDisplay);

    //SYNOPSIS
    let synopsis = document.createElement("p");
    synopsis.textContent = movie.overview;
    document.querySelector("#movie-card").appendChild(synopsis);

    //CAST
    const castNames = movie.casts.map((cast) => cast.name);
    let castList = document.createElement("ul");
    document.querySelector("#movie-card").appendChild(castList);

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
const movieBtn = document.querySelector("#movie-btn");
movieBtn.addEventListener("click", () => {
  findMovie();
});

// CLICK EVENT FOR READ MORE... BUTTON
