const API_BASE = 'https://api.themoviedb.org/3';
const API_KEY = 'a3f1f58a6268353d9049816704dd90d4';

export const getGuestSession = async () => {
  const response = await fetch(
    `${API_BASE}/authentication/guest_session/new?api_key=${API_KEY}`,
  );
  if (!response.ok) {
    throw new Error('Failed to create guest session');
  }
  const data = await response.json();
  return {
    id: data.guest_session_id,
    expiresAt: data.expires_at,
  };
};

export async function getMovies(query = 'return', page = 1) {
  const response = await fetch(
    `${API_BASE}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`,
  );
  const data = await response.json();
  if (data.results) {
    return {
      movies: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    };
  } else {
    throw new Error('Failed to fetch movies');
  }
}

export async function getRatedMovies(sessionId, page = 1) {
  const url = `${API_BASE}/guest_session/${sessionId}/rated/movies?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=created_at.asc`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.success === false) {
    throw new Error(data.status_message + ' Failed to get rated movies');
  }
  return {
    movies: data.results,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}

export async function rateMovie(movieId, rating, sessionId) {
  const url = `${API_BASE}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${sessionId}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ value: rating }),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.status_message + ' Failed to rate movie');
  }
  return data;
}

export async function getGenres() {
  const url = `${API_BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }
  return data.genres;
}
