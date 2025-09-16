// Similar movies route
const request = require('postman-request');
const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const TMDB = 'https://api.themoviedb.org/3';
const apiKey = process.env.API_KEY;

function similarMovies(movieId, callback) {
  const url = `${TMDB}/movie/${movieId}/similar?api_key=${apiKey}`;

  request({ url, json: true }, (error, res, body) => {
    if (error) return callback(error);
    if (res && res.statusCode >= 400) {
      return callback(new Error(`TMDB error ${res.statusCode}`));
    }
    callback(undefined, (body && body.results) || []);
  });
}

module.exports = { similarMovies };











// const request = require('postman-request') 


// const similarMovies = () => {
//     const url = https://api.themoviedb.org/3/movie/{movie_id}/similar

//     request({ url: url, json: true }, function (error, resonse) {
//         if (error) {
//             console.log('There was an error with your search');
//         } else {
//             resonse.body.results.forEach(function (movie) {
//                 console.log('Movie Title:', movie.title);
//                 console.log('Movie Id:', movie.id);
//             })
//         }
//     })
// }



// app.get('/api/movie/:id/similar', function (req, res) {
// const id = req.params.id;
// const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${TMDB_API_KEY}`;

// request({ url: url, json: true }, function (error, resonse) {
//     if (error) {
//         res.status(500).json({ error: 'Similar request failed' });
//     } else {
//         res.json(resonse.body);
//     }
// });
// });

// app.listen(PORT, function () {
//     console.log(`Server running at http://localhost:${PORT}`);
// });