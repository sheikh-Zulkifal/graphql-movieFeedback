import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      className="w-64 bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition"
      onClick={() => onClick(movie)}
    >
      <img src={movie.image} alt={movie.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{movie.name}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
