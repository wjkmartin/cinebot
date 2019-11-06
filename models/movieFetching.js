const API_KEY = '7ffcd202'; //secret... don't steal. or do, I actually don't care.
const APIString = "https://www.omdbapi.com/?" + "apikey=" + API_KEY;

const fetch = require('node-fetch');

const getDB = require('../util/database').getDb;

let currentMovie = {
    // Title: 'oop',
    // Poster: 'https://via.placeholder.com/400x650',
    // MovieID: 'ttsumthin'
}

module.exports = {
    getRandomMovie() {
        let promise = new Promise((resolve, reject) => {
            getRandomMovieData().then(data => {
                setMovieData(data);
            });
            resolve(currentMovie)
        })
        return promise;
        
    }
}

function setMovieData(data) {
    currentMovie.MovieID = data.tconst; //always should exist.
    getMovieDataByID(data.tconst).then(data => {
        currentMovie.Poster = data.Poster;
        currentMovie.Title = data.Title;
    }); 
}

function setMovieDatabyType(type, data) {
    switch (type) {
        case 'title':
            currentMovie.Title = data.Title;
            break;
        case 'posterURL':
            console.log(data.Poster)
            if (data.Poster == 'N/A') { //this movie has no poster in db- TODO: add fallback
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

    let fetchData = async (url) => {
        let response = await fetch(url)
        let result = await response.json();
        return result;
    }

    return fetchData(requestString);
}

function getRandomMovieData() {
    const db = getDB();
    return db
        .collection('imdbData')
        .aggregate([{
                $match: {
                    $and: [{
                        isAdult: 0
                    }, {
                        numVotes: {
                            $gt: 200
                        }
                    }]
                }
            },
            {
                $sample: {
                    size: 1
                }
            }
        ])
        .toArray()
        .then(data => {
            return data[0]
        })
        .catch(err => {
            console.log("DB ERROR: " + err);
        });
}