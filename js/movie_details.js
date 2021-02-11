// Initialize API
const API_URL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=c1042292167adc9dc2dbe3a920a743d2&language=en-US&region=ID'
let DETAIL_PATH = '';

let arrDuration = [];
let arrCast = [];

async function moviesData() {
    const res = await fetch(API_URL);
    const resData = await res.json();

    resData.results.forEach((movie, index) => {
        // Initialize path every loop with differents movie.id
        DETAIL_PATH = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=c1042292167adc9dc2dbe3a920a743d2&append_to_response=credits`;
    });


    const detailRes = await fetch(DETAIL_PATH);
    const detailData = await detailRes.json();

    resultData.results.forEach(movie => {
        arrDuration = detailData.runtime;
        detailData.credits.cast.forEach(cast => {
            // Array untuk nampung cast dan runtime supaya bisa dibawa barengan ke addToDetailPage
            arrCast = [];
            arrCast.push(cast.name);
        });
    });
}

console.log(arrDuration);
console.log(arrCast);

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
