import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './SearchBar/SearchBar'
import { useState } from 'react';
import { fetchMovies } from '../services/movieService';
import type { Movie } from '../types/movie';
import MovieGrid from './MovieGrid/MovieGrid';
import MovieModal from './MovieModal/MovieModal';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isShowModal, setisShowModal] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie|null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSearch = async (query: string) => {
    try {
        setIsLoading(true)
        const fetchedMovies = await fetchMovies(query);
        setMovies(fetchedMovies);
        if (fetchedMovies.length === 0 && query) {
          toast.error("No movies found for your request.");
        }

        if(!query){
          toast.error("Please enter your search query.");
        }
    } 
    catch  {
      setIsError(true)      
    }
    finally{
      setIsLoading(false)
    }
    
  }
  
  const onSelect = (id: number) => {
    const movie = movies.find(movie => movie.id === id);
    if (movie) {
        setSelectedMovie(movie);
        setisShowModal(true);
    }
}

  const handleClose = () => {
    setSelectedMovie(null)
    setisShowModal(false)
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch}/>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <MovieGrid onSelect={onSelect} movies={movies}/>
    {isShowModal && selectedMovie && <MovieModal movie={selectedMovie} onClose={handleClose} />}
    {isLoading && <Loader/>}
    {isError && <ErrorMessage/>}
    </div>
  )
}

export default App
