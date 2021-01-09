const TABS = {
  HOME: "HOME",
  LIKEDLIST: "LIKED LIST",
};

const model = {
  movies: [],
  hasError: false,
  page: 1,
  selection: "/movie/popular",
  liked: [],
  activeTab: TABS.HOME,
};

const baseUrl = "https://api.themoviedb.org/3";
const popularUrl = "/movie/popular";
const apiKey = "?api_key=391415faa44f91d2b92477a8db1e4c22";

const loadEvents = () => {
  const nextButton = document.querySelector(".next-button");
  const prevButton = document.querySelector(".prev-button");
  const optionButton = document.querySelector(".select-style");
  const likedButtons = document.querySelectorAll(".liked-button");

  nextButton.addEventListener("click", nextPage);
  prevButton.addEventListener("click", prevPage);
  optionButton.addEventListener("change", updateOption);
  Array.from(likedButtons).forEach((button) => {
    button.addEventListener("click", addLiked);
  });
};

const addLiked = (event) => {
  const movieId = event.target.id;
  if (model.liked.indexOf(movieId) === -1) {
    model.liked.push(movieId);
    console.log(model.liked);
    return model.liked;
  } else {
    return model.liked;
  }
};
console.log(model.liked);

const tabSwitch = (event) => {
  const tabName = event.target.className;
  model.activeTab = tabName;
  console.log(model.activeTab);
  updateTab();
};

const updateTab = () => {
  const listContainer = document.querySelector(".home-liked-container");

  if (model.activeTab === TABS.HOME) {
    countPage();
    getPopular();
  } else {
    countPage();
    createLiked();
  }
};

// const getLiked = (model) => {
//   fetch(`${baseUrl}/movie/${model.liked[i]}${apiKey}&language=en-US`, {
//     method: "get",
//   })
//     .then((resp) => resp.json())
//     .then((Movie) => {
//       model.movies.push(Movie);
//       console.log(Movie);
//       innerHtml = "";

//       createLiked(Movie);
//     })
//     .catch((err) => {
//       console.error("error!", err);
//     });
// };

// const createLiked = (Movie) => {
//   const movieContainer = document.querySelector(".movie-container");
//   movieContainer.innerHTML = "";
//   for (i = 0; i < model.movies.length; i++) {
//     fetch(`${baseUrl}/movie/${model.liked[i]}${apiKey}&language=en-US`, {
//       method: "get",
//     })
//       .then((resp) => resp.json())
//       .then((Movie) => {
//         model.movies.push(Movie);
//         console.log(Movie);
//         innerHtml = "";
//         const movie = document.createElement("div");
//         movieContainer.appendChild(movie);
//         movie.className = "movie";
//         movie.id = model.movies[i].id;
//         const innerHtml = `
//       <div class="movie-data" id="${model.movies[i].id}">
//           <img class="poster" src="https://image.tmdb.org/t/p/w500/${model.movies[i].poster_path}">
//           <p class="movie-name" id="${model.movies[i].id}">${model.movies[i].original_title}</p>
//           <div class="movie-vote">
//           <div class="vote">
//           <ion-icon name="star" class="star-icon"></ion-icon>
//           <p class="vote-score">${model.movies[i].vote_average}</p>
//           </div>
//           <button
//           class="liked-button"
//           id="${model.movies[i].id}"
//           >Like!</button>
//           </div>
//           </div>
//       `;
//         movie.innerHTML = innerHtml;
//         loadEvents();
//       });
//   }
// };

const countPage = () => {
  const pageCountContainer = document.querySelector(".page-count-container");
  pageCountContainer.innerHTML = "";
  const pageNow = document.createElement("div");
  pageCountContainer.appendChild(pageNow);
  pageNow.className = "pageNow";
  const pageHtml = `
    <p>${model.page}/500</p>
    `;
  pageNow.innerHTML = pageHtml;
};

const createCard = (Movie) => {
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = "";
  for (i = 0; i < Movie.results.length; i++) {
    const movie = document.createElement("div");
    movieContainer.appendChild(movie);
    movie.className = "movie";
    movie.id = Movie.results[i].id;
    const innerHtml = `
    <div class="movie-data" id="${Movie.results[i].id}">
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${Movie.results[i].poster_path}">       
        <p class="movie-name" id="${Movie.results[i].id}">${Movie.results[i].original_title}</p>
        <div class="movie-vote">
        <div class="vote">
        <ion-icon name="star" class="star-icon"></ion-icon>
        <p class="vote-score">${Movie.results[i].vote_average}</p>
        </div>
        <button 
        class="liked-button" 
        id="${Movie.results[i].id}"
        >Like!</button>
        </div>
        </div>     
    `;
    movie.innerHTML = innerHtml;
  }
  loadEvents();
};

const getPopular = () => {
  fetch(`${baseUrl}${model.selection}${apiKey}&page=${model.page}`, {
    method: "get",
  })
    .then((resp) => resp.json())
    .then((Movie) => {
      model.movies = Movie.results;
      console.log(Movie);
      innerHtml = "";

      createCard(Movie);
    })
    .catch((err) => {
      console.error("error!", err);
    });
};

const nextPage = () => {
  let j = 0;
  if (j <= 500) {
    j = j + 1;
    model.page = model.page + j;
    getPopular();
    countPage();
  } else {
    return;
  }
};

const prevPage = () => {
  if (model.page > 1) {
    model.page = model.page - 1;
    getPopular();
    countPage();
  } else {
    return;
  }
};

const updateOption = () => {
  let myselect = document.querySelector(".select-style");
  let index = myselect.selectedIndex;
  console.log(myselect[index].value);
  console.log(index);

  if (myselect[index].value === "Popular") {
    const popular = "/movie/popular";
    model.selection = popular;

    getPopular(model.selection);
  } else if (myselect[index].value === "Now playing") {
    const nowPlaying = "/movie/now_playing";
    model.selection = "/movie/now_playing";

    getPopular(model.selection);
  } else if (myselect[index].value === "Top rated") {
    const topRated = "/movie/top_rated";
    model.selection = topRated;

    getPopular(model.selection);
  } else if (myselect[index].value === "Upcoming") {
    const upcoming = "/movie/upcoming";
    model.selection = upcoming;

    getPopular(model.selection);
  } else {
    return getPopular(model.selection);
  }
};

countPage();
getPopular();
