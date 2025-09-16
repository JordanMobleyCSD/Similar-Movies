// Declarations and paths for the search function 
const request = require('postman-request');
const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const TMDB = 'https://api.themoviedb.org/3';
const apiKey = process.env.API_KEY;

function searchMovies(query, callback) {
  const url = `${TMDB}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

  request({ url, json: true }, (error, res, body) => {
    if (error) return callback(error);
    if (res && res.statusCode >= 400) {
      return callback(new Error(`TMDB error ${res.statusCode}`));
    }
    callback(undefined, (body && body.results) || []);
  });
}

module.exports = { searchMovies };












// const express = require('express')
// const dotenv = require('dotenv')
// require("dotenv").config({ path: './.env' });

// dotenv.config()
// const apiKey = process.env.API_KEY;

// const url = 'https://api.themoviedb.org/3/search/movie?api_key=5b7238efe00b597382d83b27db081e84&query=interstellar'

// request({ url: url, json: true }, function (error, resonse) {
//     if (error) {
//         console.log('There was an error with your search');
//     } else {
//         resonse.body.results[0].forEach(function (movie) {
//             console.log('Movie Title:', movie.title);
//             console.log('Movie Id:', movie.id);
//         })
//     }
// })


// Search route for movie app 
// app.get('/api/search', function (req, res) {
// const query = req.query.q;
// const url = `https://api.themoviedb.org/3/search/movie`;

// request({ url: url, json: true }, function (error, resonse) {
//     if (error) {
//         res.status(500).json({ error: 'Search request failed' });
//     } else {
//         res.json(resonse.body);
//     }
// });
// });




// ?? Why does this one not work but the first one does work?? // 
// const movieSearch = () => {
//     const url = 'https://api.themoviedb.org/3/search/movie?api_key=5b7238efe00b597382d83b27db081e84&query=interstellar'

//     request({ url: url, json: true }, function (error, resonse) {
//     if (error) {
//         console.log('There was an error with your search');
//     } else {
//         resonse.body.results.forEach(function (movie) {
//             console.log('Movie Title:', movie.title);
//             console.log('Movie Id:', movie.id);
//         })
//     }
// })
// }



///////////////////////////////////////////////////////////////


// // server.js
// const express = require('express');
// const request = require('postman-request');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// const TMDB_KEY = process.env.TMDB_API_KEY;
// const TMDB_BASE = 'https://api.themoviedb.org/3/search/movie';

// app.use(express.static('public'));

