import { useEffect } from 'react'
import css from "./MovieModal.module.css"
import type { Movie } from '../../types/movie'
import { createPortal } from 'react-dom'

interface MovieModalProps{
    movie: Movie
    onClose: () => void
}

const MovieModal = ({movie, onClose}:MovieModalProps) => {
    useEffect(() =>{
        const escape = (event: KeyboardEvent) =>{
            if(event.key === `Escape`){
                onClose()
            }
            }
            document.addEventListener(`keydown`, escape)
            document.body.style.overflow = "hidden"
            return () => {
                document.removeEventListener(`keydown`, escape)
                document.body.style.overflow = "auto"
            }
        }
    , [])
  
    return (
    createPortal(<div onClick={onClose} className={css.backdrop} role="dialog" aria-modal="true">
  <div className={css.modal} onClick={(e) => e.stopPropagation()}>
    <button onClick={onClose} className={css.closeButton} aria-label="Close modal">
      &times;
    </button>
    <img
      src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
      alt="movie_title"
      className={css.image}
    />
    <div className={css.content}>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}
      </p>
    </div>
  </div>
</div>, 
document.getElementById(`modal-root`) as HTMLDivElement)

  )
}

export default MovieModal
