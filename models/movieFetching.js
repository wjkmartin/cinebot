const API_KEY = '7ffcd202'; //secret... don't steal. or do, I actually don't care.
const APIString = "https://www.omdbapi.com/?" + "apikey=" + API_KEY;

const fetch = require('node-fetch');

const getDB = require('../util/database').getDb;

let currentMovie = {
    Title: 'oop',
    Poster: 'https://via.placeholder.com/400x650',
    MovieID: 'ttsumthin'
}

module.exports = {
    getRandomMovie: () => {
        getRandomMovieData()
            .then(data => {
                setMovieData(data)
            })
        return new Promise((resolve, reject) => {
            resolve(currentMovie)
        })
    }
}

function setMovieData(data) {
    currentMovie.MovieID = data.tconst;
    if (data.primaryTitle == undefined) { //this movie does not have a primary title.
        getMovieDataByID(data.tconst) //use openIMdb to get the title
            .then(data => { 
                setMovieDatabyType('title', data)          
            })
    } else {
        currentMovie.Title = data.primaryTitle
    }
    getMovieDataByID(data.tconst)
        .then(data => {
            setMovieDatabyType('posterURL', data)
        })
}

function setMovieDatabyType(type, data) {
    switch (type) {
        case 'title':
            currentMovie.Title = data.Title;
            break;
        case 'posterURL':
            if (data.Poster == 'N/A') {
                currentMovie.Poster = 'https://via.placeholder.com/400x650'
            } else {
                currentMovie.Poster = data.Poster;
            }
            break;
        

        default:
            break;
    }
}

function getMovieDataByID(IMDBid) {
    let requestString = APIString + '&i=' + IMDBid;

    return fetch(requestString)
        .then(response => response.json())
        .then(movieData => {
            return movieData;
        });
}


function getRandomMovieData() {
    const db = getDB();
    return db
        .collection('imdbData')
        .aggregate([{
            $sample: {
                size: 1
            }
        }])
        .toArray()
        .then(data => {
            return data[0]
        })
        .catch(err => {
            console.log("DB ERROR: " + err);
        });
}

