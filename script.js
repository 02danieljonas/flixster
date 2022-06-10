/*For this program to run you must create a folder with the file hi.js 
hi.js:
const API_KEY = 'api key'
        img = document.createElement("img");
        image = document.createElement("div");
        image.appendChild(img);
        imgContainer.appendChild(image);
        img.src = e.images.original.url;

        make it so the evenlist is only sent once when typing
        when the listern is almost done is check the search and if search is different is fires another 
*/
let count = 0
let movieTemplate = {
    movieTrailer: "",
    title: "",
    image: "",
    votes: "",
    movieLink: "",
    genres: "",
    movieRating: "PG-13",
    Seasons: "",
};

const TV_GENRES = {
    genres: [
        {
            id: 10759,
            name: "Action & Adventure",
        },
        {
            id: 16,
            name: "Animation",
        },
        {
            id: 35,
            name: "Comedy",
        },
        {
            id: 80,
            name: "Crime",
        },
        {
            id: 99,
            name: "Documentary",
        },
        {
            id: 18,
            name: "Drama",
        },
        {
            id: 10751,
            name: "Family",
        },
        {
            id: 10762,
            name: "Kids",
        },
        {
            id: 9648,
            name: "Mystery",
        },
        {
            id: 10763,
            name: "News",
        },
        {
            id: 10764,
            name: "Reality",
        },
        {
            id: 10765,
            name: "Sci-Fi & Fantasy",
        },
        {
            id: 10766,
            name: "Soap",
        },
        {
            id: 10767,
            name: "Talk",
        },
        {
            id: 10768,
            name: "War & Politics",
        },
        {
            id: 37,
            name: "Western",
        },
    ],
};
const MOVIE_GENRES = {
    genres: [
        {
            id: 28,
            name: "Action",
        },
        {
            id: 12,
            name: "Adventure",
        },
        {
            id: 16,
            name: "Animation",
        },
        {
            id: 35,
            name: "Comedy",
        },
        {
            id: 80,
            name: "Crime",
        },
        {
            id: 99,
            name: "Documentary",
        },
        {
            id: 18,
            name: "Drama",
        },
        {
            id: 10751,
            name: "Family",
        },
        {
            id: 14,
            name: "Fantasy",
        },
        {
            id: 36,
            name: "History",
        },
        {
            id: 27,
            name: "Horror",
        },
        {
            id: 10402,
            name: "Music",
        },
        {
            id: 9648,
            name: "Mystery",
        },
        {
            id: 10749,
            name: "Romance",
        },
        {
            id: 878,
            name: "Science Fiction",
        },
        {
            id: 10770,
            name: "TV Movie",
        },
        {
            id: 53,
            name: "Thriller",
        },
        {
            id: 10752,
            name: "War",
        },
        {
            id: 37,
            name: "Western",
        },
    ],
};
let showList = {};
let searchBar = document.querySelector("#search-input");
let searchResultContainer = document.querySelector("#search-container");
let closeIcon = document.querySelector("#close-icon");
let searchBarValue = searchBar.value;
let moreInfo = document.querySelector("#more-info")
let surroundInfo = document.querySelector("#surround-image")
let selectedShow

console.log(surroundInfo)

function showDefaultSearch() {
    document.querySelectorAll(".movieRow").forEach((e) => {
        e.classList.remove("hidden");
    });
    document.querySelector("#search-container").classList.add("hidden");
    searchBar.value = "";
}

searchBar.addEventListener("input", search, { once: true });
closeIcon.addEventListener("click", showDefaultSearch);

function clearScreen() {
    let movieRow = document.querySelectorAll(".movieRow");
    movieRow.forEach((e) => {
        e.classList.add("hidden");
    });
    document.querySelector("#search-container").classList.remove("hidden");
}

function createImageLink(link, page) {
    return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchBarValue}&page=1&include_adult=false`;
}

async function search() {
    console.log("EL removed: ", searchBarValue);
    if (searchBarValue != "") {
        console.log(searchBarValue);
        clearScreen();

        let res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchBarValue}&page=1&include_adult=false`
        );
        let resData = await res.json();

        document.querySelector("#search-container").innerHTML = "";

        console.log(resData);

        resData.results.forEach((e) => {
            console.log(e)
            if (e.backdrop_path == null) {
                return;
            }
            // console.log("Improtant", e.backdrop_path);
            document.querySelector("#search-container").innerHTML += `
            <div
            class="searchedImage"
            
            >
            <img src="https://image.tmdb.org/t/p/w500${e.backdrop_path}" 
            alt="${e.title}"
            id=${e}
            class="IImg"
            ></img>
            <h1 id="searchTitle" class="big-title">
            ${e.title}
            </h1>
            ${e.vote_average}<span class=gold-please>★</span>

</div>
            `;
        });
    } else {
        clearScreen();
    }

    setTimeout(() => {
        // console.log("1500 time has passed");
        if (searchBar.value == "") {
            showDefaultSearch();
            console.log("EL added");
            searchBar.addEventListener("input", search, { once: true });
        }
        if (searchBarValue != searchBar.value && searchBar.value != "") {
            searchBarValue = searchBar.value;
            search();
        } else {
            console.log("EL added");
            searchBar.addEventListener("input", search, { once: true });
        }
    }, "1500");
}

let container = document.querySelector("#container");

function newMediaContainer(title, movies) {
    let x = "";
    for (let i = count; i < count+4; i++) {
        console.log(movies[i])
        showId = `${movies[i].backdrop_path}, ${movies[i]} , ${movies[i].overview} , ${movies[i].vote_average} , ${movies[i].title}`;
        x += `
        <span
        potato="why-potato-no-work-sad-face">
        <img src="https://image.tmdb.org/t/p/w500${movies[i].backdrop_path}" 
        alt="${movies[i].title}"
        class="movieImage"

        ></img>
        <div id="moreInfo" class=""><h1 class="big-title">${movies[i].title}</h1> ${movies[i].vote_average}<span class=gold-please>★</span></div>
        </span>
        `;
    }
    count+=4
    
    container.innerHTML += `
    <div class="movieRow carousel-container">
    <span class=genre-title>${title}</span>
    <div class="mediaContainer">
    ${x}
    </div>
    </div>`;
}

//https://flaviocopes.com/how-to-shuffle-array-javascript/

function findGenre(showType, name) {
    let genreObject;
    let id = "";

    showType = showType == "both" ? "tv" : showType;

    if (showType == "movie") {
        genreObject = MOVIE_GENRES;
    } else if (showType == "tv") {
        genreObject = TV_GENRES;
    } else {
        console.error(
            `showType can only be "movie" or "tv" but recieved ${showType}`
        );
        return;
    }

    genreObject.genres.forEach((e) => {
        if (e.name.toLowerCase() == name.toLowerCase()) {
            id = e.id;
            // console.log(id);
        }
    });
    if (id == "") {
        console.error(`The genre ${name} is not in the ${showType} object`);
    }
    return id;
}
async function getNowPlaying() {
    let res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
    );
    let resData = await res.json();
    // console.log(resData.results)
    newMediaContainer("Now Playing", resData.results);
    newMediaContainer("",resData.results);
    newMediaContainer("",resData.results);
    newMediaContainer("",resData.results);
    newMediaContainer("",resData.results);
}

async function searchAPI(type, genre, title) {
    let z = "";
    let res;
    let resData;
    let results;

    if (genre.length > 0) {
        genre.forEach((elem) => {
            z += `${findGenre(type, elem)},`;
        });
    }

    if (type == "both") {
        let tvRes = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${z}`
        );
        let movieRes = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${z}`
        );
        resData = await tvRes.json();
        let resData2 = await movieRes.json();

        results = resData.results.concat(resData2.results);
        results = results.sort(() => {
            return -0.13934786658033738;
        });
    } else {
        res = await fetch(
            `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_genres=${z}
        `
        );
        resData = await res.json();
        results = resData.results;
    }
    newMediaContainer(title, results);
}


getNowPlaying();
//! now playing should be the last row and should go on forever