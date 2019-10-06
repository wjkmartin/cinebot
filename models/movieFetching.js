const API_KEY = '7ffcd202';
const APIString = "https://www.omdbapi.com/?" + "apikey=" + API_KEY;

const fetch = require('node-fetch');

const getDB = require('../util/database').getDb;

let currentMovie = {
    Title: 'oop',
}

module.exports = {
    getRandomMovie: () => {
        const randomMovieData = getRandomMovieData()
            .then(data => {
                setMovieData(data)
            })
        return currentMovie
    }
}

function setMovieData(data) {
    if (data.primaryTitle == undefined) {
        getMovieDataByID(data.tconst)
        .then(data => {
            setMovieDatabyType('title', data)})
    }
    else {
        currentMovie.Title = data.primaryTitle
    }
}

function setMovieDatabyType(type, data) {
    switch (type) {
        case 'title':
            currentMovie.Title = data.Title;
            break;
    
        default:
            break;
    }
}

function getMovieDataByID(IMDBid) {
    console.log("imdb id is:" + IMDBid);
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