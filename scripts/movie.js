const apiUrl = "https://jsonfakery.com/movies/random";
const movieDisplay = document.getElementById("button")

const findMovie = async () => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const movie = await response.json();
    console.log(movie.original_title);
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const showMovie = () => {
   movieDisplay.innerHTML = ""
}

findMovie();
