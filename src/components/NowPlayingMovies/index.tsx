import { useState, useEffect } from 'react';
import { api } from '../../API';
import { MoviePropTypes } from '../../Global.props';

type Movies = {
  page: number;
  results: MoviePropTypes[];
  total_pages: number;
  total_results: number;
};

function NowPlayingMovies() {
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(true);
  const [ movies, setMovies ] = useState<MoviePropTypes[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data: Movies = await api.fetchNowPlayingMovies(1); // Fetch the first page
        setMovies(data.results); // Assuming the API returns an object with a results array
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies');
        setLoading(false);
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Now Playing Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li> // Adjust according to your MoviePropTypes
        ))}
      </ul>
    </div>
  );
}

export default NowPlayingMovies;
