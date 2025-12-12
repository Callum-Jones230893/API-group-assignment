const apiUrl = "https://jsonfakery.com/movies/random";
const movieDisplay = document.getElementById("movie-button");
const movieCard = document.querySelector("#movie-card");

const findMovie = async () => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }

    const movie = await response.json();
    console.log(movie.original_title);

    let movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.original_title;
    document.querySelector("#movie-card").appendChild(movieTitle);

    const imgURL = movie.poster_path;
    let imageDisplay = document.createElement("img");
    imageDisplay.src = imgURL;
    movieCard.appendChild(imageDisplay);

    let synopsis = document.createElement("p");
    synopsis.textContent = movie.overview;
    document.querySelector("#movie-card").appendChild(synopsis);

    const castNames = movie.casts.map((cast) => cast.name);

    let castDisplay = document.createElement("p");
    castDisplay.textContent = castNames;
    document.querySelector("#movie-card").appendChild(castDisplay);

    console.log(castDisplay);
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const movieBtn = document.querySelector("#movie-btn");
movieBtn.addEventListener("click", () => {
  findMovie();
});
