import { useState } from 'react';
import './App.css';

function App() {
  const[search, setSearch]=useState("");
  const[movie, setMovie]=useState("");
  const [movieData, setMovieData] = useState(null);
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  console.log(apiKey);

  async function handleSearch(){
    setMovie(search);
    const response=await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&t=${search}`
    );
    const data=await response.json();
    setMovieData(data);
  }

  return (
    <div className="container">
      <h1>Movie Search App</h1>
      <input 
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type the name of the movie here..."
      />

      <button onClick={handleSearch}>Search</button>

      <h2>You searched for: {movie}</h2>
      
      {movieData && (
        <div className="movie-card"> 
        {movieData.Poster !== "N/A" ?(
          <img
            src={movieData.Poster}
            alt={movieData.Title}
          />
        ):(
          <div className="no-poster">
            🎬 No Poster Available
          </div>)}
          
          <h2>{movieData.Title}</h2>
          <p>Year: {movieData.Year}</p>
          <p>⭐ Rating: {movieData.imdbRating}</p>
          <p>{movieData.Plot}</p>

        </div>
      )}

    </div>
  );
}

export default App;