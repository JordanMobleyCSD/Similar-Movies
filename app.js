// // Declarations, packages and paths
// const express = require('express');
// const path = require('path');
// // require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// const dotenv = require("dotenv");
// dotenv.config();

// const { searchMovies } = require('./utils/movieSearch');
// const { similarMovies } = require('./utils/similarMovies');

// const app = express();
// const PORT = process.env.PORT || 3000;


// Load environment variables first
require('dotenv').config();

// Declarations, packages and paths
const express = require('express');
const path = require('path');
const { searchMovies } = require('./utils/movieSearch');
const { similarMovies } = require('./utils/similarMovies');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const TMDB = "https://api.themoviedb.org/3";
const apiKey = process.env.API_KEY

// app.use(express.static(path.join(__dirname, 'public')));



// app.get('/', (_, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// search for the movie title -- (q = query)
app.get('/api/search', async(req, res) => {
  const q = (req.query.query || '').trim();
  if (!q) return res.status(400).json({ error: 'Please enter a movie title into the field' });

  searchMovies(q, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// return the similar movies 
app.get('/api/movies/:id/similar', (req, res) => {
  const id = req.params.id;

  similarMovies(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Gathering the similar movie titles based on the search query 
app.get('/api/similar-by-title', (req, res) => {
  const q = (req.query.query || '').trim();
  if (!q) return res.status(400).json({ error: 'Please enter a movie title into the field' });

  searchMovies(q, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.json({ searched: null, similar: [] });

    const first = results[0]; 
    similarMovies(first.id, (e2, sim) => {
      if (e2) return res.status(500).json({ error: e2.message });
      res.json({ searched: first, similar: sim });
    });
  });

  
  // Allows the server to run on whatever PORT has been designated if other than 3000 (locally)
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});








// Practice code from coding session on 9/11 with Latori -- typicodeapi 
// onst express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// // Serve the static front end  from public/
// app.use(express.static(path.join(__dirname, 'public')))

// // GET
// app.get('/api/posts', async (req, res) => {
//         const page = toPosInt(req.query.page, 1)
//         const limit = toPosInt(req.query.limit,10);

//         try {
//             const URL = 'https://jsonplaceholder.typicode.com/post';
//             const reponse = await axios.get(URL, { 
//             params: { _page: page, _limit: limit },
//             headers: { 'Accept': 'application/jason' }
//         })

//             const data = response.data;

//             res.json({data, page, limit, total});
//         } catch (err) {
//             console.log(err.message);
//             res.status(500).json({error: 'Failed to fetch posts'});
//         }

//     })

//     app.listen(PORT, () => {
//         console.log(`Server running on http://localhost:${PORT}`);
//     })




// const express = require('express');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const STATIC_DIR = path.join(__dirname, 'public');

// console.log('STATIC_DIR:', STATIC_DIR);
// console.log('Dir exists:', fs.existsSync(STATIC_DIR));
// console.log('Contents:', fs.readdirSync(STATIC_DIR));        // <— should show index.html and frontend.js
// console.log('Has frontend.js:', fs.existsSync(path.join(STATIC_DIR, 'frontend.js')));

// app.use(express.static(STATIC_DIR));                         // serve /public

// app.get('/', (_req, res) => res.sendFile(path.join(STATIC_DIR, 'index.html')));

// // quick list endpoint
// app.get('/__ls', (_req, res) => res.json(fs.readdirSync(STATIC_DIR)));

// app.listen(3000, () => console.log('Server running on http://localhost:3000'));