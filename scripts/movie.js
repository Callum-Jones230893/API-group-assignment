const apiKey = "87a84deb"
const apiUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=87a84deb"

const findMovie = async () => {
    let searchValue = searchInput.value
    searchValue = searchValue.trim()

    const url = `${apiUrl}?apikey=${apiKey}&t=${searchValue}`;

    try {
        const response = await (fetch(url))
    
    if(!response.ok) {
        throw new Error (`Network response was not ok`)
        }
    const movie = await response.json()

    if (movie.response === "True") {
        console.log("movie".movie)
    }
    }
}
