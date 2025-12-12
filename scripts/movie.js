const apiUrl = "https://jsonfakery.com/movies/random";
const movieDisplay = document.getElementById("movie-button");

const findMovie = async () => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }

    const imgURL =
      "https://image.tmdb.org/t/p/original/nBLPIpReSatt1zcgVzSVzq5e581.jpg";
    let imageDisplay = document.getElementById("img");

    const movie = await response.json();
    console.log(movie.original_title);

    let movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.original_title;
    document.body.appendChild(movieTitle);

    let synopsis = document.createElement("p");
    synopsis.textContent = movie.overview;
    document.body.appendChild(synopsis);

    let casts = movie.casts;
    casts.forEach((cast) => {
      console.log(cast.name);
      casts.document.createElement("p");
      casts.textContent = movie.casts;
      document.body.appendChild(casts);
    });

    console.log(casts);
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

findMovie();

/*const showMovie = () => {
  movieDisplay.innerHTML = "";

  const title = movie.original_title;
  const synopsis = movie.overview;
  const poster = movie.poster_path;

  const casts = movie.casts; //have to do it in a foreach-loop
  casts.forEach((casts) => {
    console.log(movie.casts);
  });
};

*/
