import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../grapgql/quries';
import MovieCard from '../components/MovieCard';
import FeedbackModal from '../components/FeedbackModal';

export default function Home() {
  const { data, loading, error } = useQuery(GET_MOVIES);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies.</p>;
  console.log('Movies data:', data);
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
       {data.movies.map((movie) => (
  <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
))}

      </div>

      {selectedMovie && (
        <FeedbackModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
