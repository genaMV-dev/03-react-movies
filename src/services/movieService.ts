import axios from "axios";
import type { Movie } from "../types/movie";


export interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
 
const VITE_TMDB_TOKEN = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDQwZDFkYTQ3ZDU1N2RkOWNjOGQ0ZWNjZmRiZGMwYyIsIm5iZiI6MTc3ODE3MTE4Ni42NTY5OTk4LCJzdWIiOiI2OWZjYmQzMjE0Yjg1NzhlMzllZGEwMGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.uiWaHw2PoHx3e5p7zB75iZRthaD7xhMdjVKoX-d0z6g`;
 
const BASE_URL = `https://api.themoviedb.org/3/search/movie`;
 

 
export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<MovieApiResponse>(BASE_URL, {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
    },
  });

  

  return response.data.results;
}

