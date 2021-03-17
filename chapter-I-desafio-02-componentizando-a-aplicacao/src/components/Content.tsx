import { useContext } from 'react';

import { MovieCard } from './MovieCard';

import { MoviesContext } from '../contexts/MoviesContext';

export function Content() {
  const { selectedGenre, movies } = useContext(MoviesContext);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}