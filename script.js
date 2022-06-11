if (typeof API_KEY == "undefined") {
    document.querySelector("#container").innerHTML = `
    <span id="no-api-key">
    For this program to run you must create a file named secret.js 
    <br>
    <br>
    secret.js:
    <br>
let API_KEY =**api_key**
<span>
`;
}

let count = 0;
let page = 1;
let movieList;
let searchBar = document.querySelector("#search-input");
let closeIcon = document.querySelector("#close-icon");
let searchBarValue = searchBar.value;
let loadBtn = document.querySelector("#loadBtn");

// document.querySelector("#loadBtn").style.display = "none";

console.log(loadBtn.style.display);

function showDefaultSearch() {
    document.querySelectorAll(".movieRow").forEach((e) => {
        e.classList.remove("hidden");
    });
    loadBtn.classList.remove("hidden");

    document.querySelector("#search-container").classList.add("hidden");
    searchBar.value = "";
}

function clearScreen() {
    let movieRow = document.querySelectorAll(".movieRow");
    movieRow.forEach((e) => {
        e.classList.add("hidden");
    });
    loadBtn.classList.add("hidden");

    document.querySelector("#search-container").classList.remove("hidden");
}

async function search() {
    if (searchBarValue != "") {
        clearScreen();
        let res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchBarValue}&page=1&include_adult=false`
        );
        let resData = await res.json();

        document.querySelector("#search-container").innerHTML = "";

        resData.results.forEach((e) => {
            if (e.backdrop_path == null) {
                return;
            }
            document.querySelector("#search-container").innerHTML += `
            <div
            class="searchedImage"
            
            >
            <img src="https://image.tmdb.org/t/p/w500${e.backdrop_path}" 
            alt="${e.title} movie image"
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
        if (searchBar.value == "") {
            showDefaultSearch();
            searchBar.addEventListener("input", search, { once: true });
        }
        if (searchBarValue != searchBar.value && searchBar.value != "") {
            searchBarValue = searchBar.value;
            search();
        } else {
            searchBar.addEventListener("input", search, { once: true });
        }
    }, "1500");
}

let container = document.querySelector("#container");

function newMediaContainer(title, movies) {
    if (count == movieList.length) {
        page++;
        getNowPlaying(false);
    }
    let x = "";
    for (let i = count; i < count + 4; i++) {
        showId = `${movies[i].backdrop_path}, ${movies[i]} , ${movies[i].overview} , ${movies[i].vote_average} , ${movies[i].title}`;
        x += `
        <span
        potato="why-potato-no-work-sad-face">
        <img src="https://image.tmdb.org/t/p/w500${movies[i].backdrop_path}" 
        alt="${movies[i].title} movie image"
        class="movieImage"

        ></img>
        <div id="moreInfo" class=""><h1 class="big-title">${movies[i].title}</h1> ${movies[i].vote_average}<span class=gold-please>★</span></div>
        </span>
        `;
    }
    count += 4;

    container.innerHTML += `
    <div class="movieRow carousel-container">
    <span class=genre-title>${title}</span>
    <div class="mediaContainer">
    ${x}
    </div>
    </div>`;
}

async function getNowPlaying(setNowPlaying = true) {
    let res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    let resData = await res.json();
    movieList = await resData.results;

    count = 0;

    if (setNowPlaying) {
        newMediaContainer("Now Playing", movieList);
        newMediaContainer("", movieList);
        newMediaContainer("", movieList);
    }
    newMediaContainer("", movieList);
    loadBtn.classList.remove("hidden");
}

function clickedHome() {
    window.scrollTo(0, 0);
}

searchBar.addEventListener("input", search, { once: true });
closeIcon.addEventListener("click", showDefaultSearch);
getNowPlaying();
loadBtn.classList.remove("hidden");
