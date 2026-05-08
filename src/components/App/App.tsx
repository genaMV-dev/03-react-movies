import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar'
import { useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from "./App.module.css"

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie|null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSearch = async (query: string) => {
    try {
        setMovies([])     
        setIsError(false)  
        setIsLoading(true)
        const fetchedMovies = await fetchMovies(query);
        setMovies(fetchedMovies);
        if (fetchedMovies.length === 0 && query) {
          toast.error("No movies found for your request.");
        }

        
    } 
    catch  {
      setIsError(true)      
    }
    finally{
      setIsLoading(false)
    }
    
  }
  
  const onSelect = (movie: Movie) => {
    setSelectedMovie(movie);
}

  const handleClose = () => {
    setSelectedMovie(null)
  }

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch}/>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <MovieGrid onSelect={onSelect} movies={movies}/>
    {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleClose} />}
    {isLoading && <Loader/>}
    {isError && <ErrorMessage/>}
    </div>
  )
}

export default App
