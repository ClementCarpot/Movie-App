let movieNameRef = document.getElementById("movie-name")
let searchBtn = document.getElementById("search-btn")
let result = document.getElementById("result")

let getMovie = () => {
    let movieName = movieNameRef.value
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`

    // if input field is empty
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Saisir votre recherche</h3>`
    }

    // if input isn't empty
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            // if movie exist in database

            let sourceText = data.Plot

            // URL translation API 
            const translate = `https://api.mymemory.translated.net/get?q=${sourceText}&langpair=en|fr`

            const translateText = async () => {
                try {
                    const response = await fetch(translate);
                    const data = await response.json();
                    return data.responseData.translatedText;
                } catch (error) {
                    return console.log(error);
                }
            }

            if (data.Response == "True") {
                translateText().then((translation) => {
                    result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="assets/star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Résumé :</h3>
                    <p>${translation}</p>
                    <h3>Acteurs :</h3>
                    <p>${data.Actors}</p>
                `
                })
            }
            // if movie doesn't exist in database
            else {
                result.innerHTML = `<h3 class="msg">Aucun film ou série trouvé pour la recherche</h3>`
            }
        })
            // if error occurs
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Une erreur est survenue</h3>`
            });
    }
};

searchBtn.addEventListener("click", getMovie)
window.addEventListener("load", getMovie)