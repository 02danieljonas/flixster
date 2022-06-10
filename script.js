/*For this program to run you must create a folder with the file hi.js 
hi.js:
const API_KEY = 'api key'
        img = document.createElement("img");
        image = document.createElement("div");
        image.appendChild(img);
        imgContainer.appendChild(image);
        img.src = e.images.original.url;
*/

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

let grid = {
    name: "",
    morebButton: () => {
        console.log();
    },
    movies: movieTemplate,
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

let image = document.createElement("img");
let imgContainer = document.querySelector("#media-container");
let container = document.querySelector("#container");
// console.log(container);
function newMediaContainer(title, movies) {
    // console.log(movies[0].backdrop_path);
    let x = "";
    for (let i = 0; i < 11; i++) {
        x += `
        <img src="https://image.tmdb.org/t/p/w500${movies[i].backdrop_path}"></img>
        `;
    }
    container.innerHTML += `
    <div>
    <span class=genre-title>${title}</span>
    <div class=mediaContainer>
    ${x}
    </div>
    </div>`;
}

imgContainer.appendChild(image);

function findGenre(showType, name) {
    let genreObject;
    let id = "";

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

async function searchAPI(type, genre, title) {
    let z = "";
    // console.log(list);
    if (genre.length > 0) {
        genre.forEach((e) => {
            z += `${findGenre(type, e)},`;
        });
    }

    // console.log(z);
    let res = await fetch(
        `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_genres=${z}
        `
    );
    let resData = await res.json();
    newMediaContainer(title, resData.results);
}
searchAPI("movie", ["comedy", "action"], "comedy");

//Trending
//Popular Movies
//Comedies
//Adventure
//Thriller
//Mystery