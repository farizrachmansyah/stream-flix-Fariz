// Initialize API
const API_URL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=c1042292167adc9dc2dbe3a920a743d2&language=en-US&region=ID'
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

// Get Now Playing Movies API data
async function getMovies() {
    const res = await fetch(API_URL);
    const resData = await res.json();

    resData.results.forEach((movie, index) => {
        addToMainPage(movie, index);

        // Initialize path every loop with differents movie.id
        let DETAIL_PATH = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=c1042292167adc9dc2dbe3a920a743d2&append_to_response=credits`;
        getDetails(movie, index, DETAIL_PATH);
    });

    loading.classList.remove('show');
}

// Get more detail data each movie
let arrDuration = '';
let arrCast = [];
async function getDetails(movie, index, detail_path) {
    let detailRes = await fetch(detail_path);
    let detailData = await detailRes.json();

    // Array untuk nampung cast dan runtime supaya bisa dibawa barengan ke addToDetailPage
    arrDuration = detailData.runtime;
    arrCast = [];
    detailData.credits.cast.forEach(cast => {
        arrCast.push(cast.name);
    });
}

// Adding Element Section
function addToMainPage(movieData, movieIndex) {
    let mainContents = document.querySelector('.main-contents');
    let contentCard = document.createElement('a');
    contentCard.classList.add('content-card');
    contentCard.href = './movie_details.html';
    contentCard.id = `${movieData.id}`;

    // Pricing
    let moviePrice = '';
    if (movieData.vote_average > 8) {
        moviePrice = 'Rp 21.250';
    } else if (movieData.vote_average > 6) {
        moviePrice = 'Rp 16.350';
    } else if (movieData.vote_average > 3) {
        moviePrice = 'Rp 8.250';
    } else {
        moviePrice = 'Rp 3.500';
    }

    // Menentukan film mana yang sudah dimiliki dan belum dimiliki
    // Dipilih dengan ketentuan setiap kelipatan 5
    let cardBtn = '';
    let cardClass = '';

    movieIndex % 5 == 0 ? cardBtn = 'Owned' : cardBtn = 'Buy';
    cardBtn == 'Owned' ? cardClass = 'owned' : cardClass = cardClass;

    contentCard.innerHTML = `
        <img
            src='${IMG_PATH + movieData.poster_path}'
            class='card-image'
        />
        <div class="card-details">
            <h2 class="detail-title">${movieData.title}</h2>
            <p class="detail-price">${moviePrice}</p>
        </div>
        <a href="#" class="card-btn ${cardClass}">${cardBtn}</a>
    `;

    mainContents.appendChild(contentCard);
}

// Infinite Scroll
const loading = document.querySelector('.loading-animation');
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    let scrollHeightFixed = Math.floor(scrollHeight);

    if (clientHeight + scrollTop >= scrollHeightFixed) {
        showLoading();
    }
});
function showLoading() {
    loading.classList.add('show');
    setTimeout(getMovies, 1000);
}

// Burger menu
function handle() {
    const burger = document.querySelector('.burger-menu');
    const mobileNav = document.getElementById('mobile__nav');

    if (!mobileNav.classList.contains("nav-show")) {
        mobileNav.classList.add("nav-show");
        burger.classList.add("burger-animated");
    } else {
        mobileNav.classList.remove("nav-show");
        burger.classList.remove("burger-animated");
    }
}


// Program Flow
getMovies();

