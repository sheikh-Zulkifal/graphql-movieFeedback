import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_MOVIE } from '../grapgql/mutation';
import { GET_MOVIES } from '../grapgql/quries';
import MovieForm from '../components/MovieForm';
import MovieCard from '../components/MovieCard';

export default function AddMoviePage() {
  const { data, loading, error, refetch } = useQuery(GET_MOVIES);
  const [addMovie] = useMutation(ADD_MOVIE);

  // This function is passed to MovieForm, it calls the mutation and refreshes the list
  const handleMovieAdded = async ({ name, image }) => {
    await addMovie({ variables: { name, image } });
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <MovieForm onMovieAdded={handleMovieAdded} />

      {loading && <p className="mt-6 text-center text-gray-500">Loading movies...</p>}
      {error && <p className="mt-6 text-center text-red-500">Failed to load movies.</p>}

      {data?.movie?.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-5 text-gray-900">🎞 All Movie Posters</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {data.movie.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3 text-center text-sm font-medium text-gray-700">
                  {movie.name}
                </div>
              </div>
            ))}
            
            {/* Render each movie using MovieCard component */}
            {data.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}


          </div>
        </div>
      )}
    </div>
  );
}
