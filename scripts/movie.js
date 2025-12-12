const apiUrl = "https://jsonfakery.com/movies/random";
const movieDisplay = document.getElementById("movie-button");

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
    document.body.appendChild(movieTitle);

    const imgURL =
      "https://image.tmdb.org/t/p/original/nBLPIpReSatt1zcgVzSVzq5e581.jpg";
    let imageDisplay = document.getElementById("img");

    fetch(imgURL)
      .then((response) => response.blob())
      .then((blob) => {
        let img = document.createElement("img");
        img.src = URL.createObjectURL(blob);
        document.body.appendChild(img);
      });

    let synopsis = document.createElement("p");
    synopsis.textContent = movie.overview;
    document.body.appendChild(synopsis);

    const castNames = movie.casts.map((cast) => cast.name);

    let castDisplay = document.createElement("p");
    castDisplay.textContent = "Cast";
    castDisplay.join(", ");
    document.body.appendChild(castDisplay);

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
