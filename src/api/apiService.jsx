import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'a3f1f58a6268353d9049816704dd90d4';

export const getMovies = async (query = 'return', page = 1) => {
  const myNewQuery = query.length > 0 ? query : 'return';
  try {
    const { data } = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${myNewQuery}&page=${page}`,
    );
    console.log(data);
    return {
      movies: data.results || [],
      totalPages: data.total_results,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {
      movies: [],
      totalPages: 0,
      error: 'Failed to load movies. Please try again later.',
    };
  }
};
