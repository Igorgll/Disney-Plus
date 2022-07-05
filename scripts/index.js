const API_KEY = '03c4e3dc470296959d6bf68804146538'
const API_LANGUAGE = 'pt-br'
const BASE_URL_IMAGE = {
    original:'https://image.tmdb.org/t/p/original',
    small:'https://image.tmdb.org/t/p/w500'
}

const movies = []
const moviesElement = document.getElementById('movies')

function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`
}

function changeButtonMenu() {
    const button = document.querySelector('.button__menu')
    const navigation = document.querySelector('.navigation')

    button.classList.toggle('active')
    navigation.classList.toggle('active')
}

function setFeaturedMovie(movie) {
    const appImage = document.querySelector('.app__image img')
    const title = document.querySelector('.featured__movie h1')
    const description = document.querySelector('.featured__movie p')
    const info = document.querySelector('.featured__movie span')
    const rating = document.querySelector('.rating strong')

    title.innerHTML = movie.title
    description.innerHTML = movie.overview
    rating.innerHTML = movie.vote_average
    info.innerHTML = movie.release + ' - ' + movie.genre + ' - Movie'

    appImage.setAttribute('src', movie.image.original)
}

function changeMainMove(movieId) {
    const movie = movies.find(movie => movie.id === movieId)
    setFeaturedMovie(movie)
    changeButtonMenu()
}

function createButtonMovie(movieId) {
    const button = document.createElement('button')
    button.setAttribute('onClick', `changeMainMove('${movieId}')`)
    button.innerHTML = `<img src="/assets/icon-play-button.png" alt="Icon play button" />`
    
    return button
}

function createImageMovie(movieImage, movieTitle) {
    const divImageMovie = document.createElement('div')
    divImageMovie.classList.add('movie__image')
    const image = document.createElement('img')

    image.setAttribute('src', movieImage)
    image.setAttribute('alt', `Imagem do filme ${movieTitle}`)
    image.setAttribute('loading', 'lazy')

    divImageMovie.appendChild(image)

    return divImageMovie
}

function addMovieInList(movie) {
        const movieElement = document.createElement('li')
        movieElement.classList.add('movie')

        movieElement.setAttribute('id', movie.id)
        
        const genre = `<span>${movie.genre}</span>`
        const title = `<strong>${movie.title}</strong>`

        movieElement.innerHTML = genre + title
        movieElement.appendChild(createButtonMovie(movie.id))
        movieElement.appendChild(createImageMovie(movie.image.small, movie.title))

        moviesElement.appendChild(movieElement)
}

function loadMovies() {
    const LIST_MOVIES = ['tt12801262', 'tt7146812','tt2096673', 'tt2380307', 'tt1049413', 'tt2953050', 'tt8097030', 'tt4823776']
    LIST_MOVIES.map((movie, index) => {
        fetch(getUrlMovie(movie)).then(response => response.json()).then(data => {
            
            const movieData = {
                id: movie,
                title: data.title,
                overview: data.overview,
                vote_average: data.vote_average,
                genre: data.genres[0].name,
                release: data.release_date.split('-')[0],
                image: {
                    original: BASE_URL_IMAGE.original.concat(data.backdrop_path),
                    small: BASE_URL_IMAGE.small.concat(data.backdrop_path)
                }
            }
            movies.push(movieData)

            if(index === 0) {
                setFeaturedMovie(movieData)
            }

            addMovieInList(movieData)
        })
    })
}

loadMovies()

