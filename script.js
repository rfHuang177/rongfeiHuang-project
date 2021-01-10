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
  likedMovies: [],
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
  const likeButtons = document.querySelectorAll(".like-button");
  const movieName = document.querySelectorAll(".movie-name");

  nextButton.addEventListener("click", nextPage);
  prevButton.addEventListener("click", prevPage);
  optionButton.addEventListener("change", updateOption);
  Array.from(likedButtons).forEach((button) => {
    button.addEventListener("click", addLiked);
  });
  Array.from(likeButtons).forEach((button) => {
    button.addEventListener("click", deleteLiked);
  });
  Array.from(movieName).forEach((p) => {
    p.addEventListener("click", getDetail);
  });
};

const getDetail = (event) => {
  console.log(1);
  const movieId = event.target.id;
  console.log(movieId);
  const detailBox = document.querySelector(".detail-box");
  detailBox.classList.add("hide-box");
  detailBox.innerHTML = "";
  fetch(`${baseUrl}/movie/${movieId}${apiKey}&language=en-US`, {
    method: "get",
  })
    .then((resp) => resp.json())
    .then((movie) => {
      const movieDiv = document.createElement("div");
      detailBox.appendChild(movieDiv);
      movieDiv.className = "movie";
      movieDiv.id = movie.id;
      const innerHtml = `
      <div class="detail-card">
      <div class="detail-content">
        <img
          class="detail-poster"
          src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        />
        <div class="detail-description">
          <h3>${movie.original_title}</h3>
          <h5>Overview</h5>
          <p>
            ${movie.overview}
          </p>
          <h5>Genres</h5>
          <div class="genres">
            <div name="Fantasy">${movie.genres[0].name}</div>
           
          </div>
          <h5>Rating</h5>
          <p>${movie.vote_average}</p>
          <h5>Production companies</h5>
          <img
            class="company-logo"
            src="https://image.tmdb.org/t/p/w500/${movie.production_companies[0].logo_path}"
          />
        </div>
      </div>

      <ion-icon name="close" class="close-icon" onclick="closeDetail()"></ion-icon>
      
    </div>`;
      movieDiv.innerHTML = innerHtml;
      loadEvents();
    });
};

const closeDetail = () => {
  console.log("close");
  const detailBox = document.querySelector(".detail-box");
  detailBox.innerHTML = "";
  detailBox.classList.remove("hide-box");
};

const addLiked = (event) => {
  const movieId = event.target.id;
  event.target.classList.add("red-button");
  console.log(event.target.className);
  if (model.liked.indexOf(movieId) === -1) {
    model.liked.push(movieId);
    console.log(model.liked);
    return model.liked;
  } else {
    return model.liked;
  }
};

const deleteLiked = (event) => {
  event.target.classList.remove("red-button");
  const currenId = event.target.id;
  console.log(currenId);
  const unlikeIndex = model.liked.indexOf(currenId);
  model.liked.splice(unlikeIndex, 1);
  console.log(model.liked);
  countPage();
  createLiked(model);
};

const tabSwitch = (event) => {
  const tabName = event.target.className;
  model.activeTab = tabName;

  console.log(model.activeTab);
  updateTab();
};

const updateTab = () => {
  const listContainer = document.querySelector(".home-liked-container");

  if (model.activeTab === TABS.HOME) {
    console.log("home");
    countPage();
    getMovie();
  } else {
    console.log("likedlist");
    countPage();
    createLiked(model);
  }
};

const getLikedMovie = (model) => {
  fetch(`${baseUrl}/movie/${model.liked[i]}${apiKey}&language=en-US`, {
    method: "get",
  })
    .then((resp) => resp.json())
    .then((Movie) => {
      model.movies.push(Movie);
      console.log(Movie);
      innerHtml = "";

      createLiked(Movie);
    })
    .catch((err) => {
      console.error("error!", err);
    });
};

const createLiked = (model) => {
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = "";
  console.log(model.liked);
  for (i = 0; i < model.liked.length; i++) {
    fetch(`${baseUrl}/movie/${model.liked[i]}${apiKey}&language=en-US`, {
      method: "get",
    })
      .then((resp) => resp.json())
      .then((movie) => {
        const movieDiv = document.createElement("div");
        movieContainer.appendChild(movieDiv);
        movieDiv.className = "movie";
        movieDiv.id = movie.id;
        const innerHtml = `
          <div class="movie-data" id="${movie.id}">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
            <p class="movie-name" id="${movie.id}">${movie.original_title}</p>
            <div class="movie-vote">
            <div class="vote">
            <ion-icon name="star" class="star-icon"></ion-icon>
            <p class="vote-score">${movie.vote_average}</p>
            </div>
            <button
            class="like-button red-button"
            id="${movie.id}"
            >Liked!</button>
            </div>
            </div>
        `;
        console.log(movieContainer);
        movieDiv.innerHTML = innerHtml;
        loadEvents();
      });
  }
};

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
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${
          Movie.results[i].poster_path
        }">       
        <p class="movie-name" id="${Movie.results[i].id}">${
      Movie.results[i].original_title
    }</p>
        <div class="movie-vote">
        <div class="vote">
        <ion-icon name="star" class="star-icon"></ion-icon>
        <p class="vote-score">${Movie.results[i].vote_average}</p>
        </div>
        <button 
        class="liked-button ${
          model.liked.includes(Movie.results[i].id) ? "like-button" : ""
        }" 
        id="${Movie.results[i].id}"
        >Like!</button>
        </div>
        </div>     
    `;
    movie.innerHTML = innerHtml;
  }
  loadEvents();
};

const getMovie = () => {
  fetch(`${baseUrl}${model.selection}${apiKey}&page=${model.page}`, {
    method: "get",
  })
    .then((resp) => resp.json())
    .then((Movie) => {
      model.movies = Movie.results;
      innerHtml = "";
      if ((model.activeTab = TABS.HOME)) {
        createCard(Movie);
      } else if ((model.activeTab = TABS.LIKEDLIST)) {
        console.log(model.liked);
      }
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
    getMovie();
    countPage();
  } else {
    return;
  }
};

const prevPage = () => {
  if (model.page > 1) {
    model.page = model.page - 1;
    getMovie();
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

    getMovie(model.selection);
  } else if (myselect[index].value === "Now playing") {
    const nowPlaying = "/movie/now_playing";
    model.selection = "/movie/now_playing";

    getMovie(model.selection);
  } else if (myselect[index].value === "Top rated") {
    const topRated = "/movie/top_rated";
    model.selection = topRated;

    getMovie(model.selection);
  } else if (myselect[index].value === "Upcoming") {
    const upcoming = "/movie/upcoming";
    model.selection = upcoming;

    getMovie(model.selection);
  } else {
    return getMovie(model.selection);
  }
};

countPage();
getMovie();
