document.getElementById('searchBtn').addEventListener('click', async () => {
  const query = document.getElementById('movieInput').value.trim();
  if (!query) return alert('Please enter a movie title');

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`/api/similar-by-title?query=${encodeURIComponent(query)}`);
    const data = await res.json();

    resultsDiv.innerHTML = ""; 

    if (!data.searched) {
      resultsDiv.innerHTML = "<p>No results found.</p>";
      return;
    }

    // Show the searched movie
    const searchedMovie = document.createElement('div');
    searchedMovie.classList.add('movie-card');
    searchedMovie.innerHTML = `
      <h2>Base Movie</h2>
      <p><strong>${data.searched.title}</strong> (ID: ${data.searched.id})</p>
    `;
    resultsDiv.appendChild(searchedMovie);

    // Show similars
    const similarList = document.createElement('div');
    similarList.classList.add('movie-list');
    similarList.innerHTML = "<h2>Similar Movies:</h2>";

    if (data.similar.length === 0) {
      similarList.innerHTML += "<p>No similar movies found.</p>";
    } else {
      data.similar.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
          <p><strong>${movie.title}</strong> (ID: ${movie.id})</p>
        `;
        similarList.appendChild(card);
      });
    }

    resultsDiv.appendChild(similarList);

  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "<p>Error fetching movies.</p>";
  }
});