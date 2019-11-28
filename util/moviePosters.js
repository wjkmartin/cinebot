const API_KEY = '7ffcd202'; //secret... don't steal. or do, I actually don't care.
const APIString = "https://www.omdbapi.com/?" + "apikey=" + API_KEY;

const fetch = require('node-fetch');

module.exports = function getMoviePosterURL(tconst) {
    let requestString = APIString + '&i=' + tconst;

    let fetchData = async (url) => {
        let response = await fetch(url)
        let result = await response.json();
        return result.Poster;
    }

    return fetchData(requestString);
}