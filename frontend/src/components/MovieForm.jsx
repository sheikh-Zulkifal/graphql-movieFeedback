import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { ADD_MOVIE } from '../graphql/mutations';
import { GET_MOVIES } from '../graphql/queries';

const MovieForm = () => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to backend `/upload` route
    const formData = new FormData();
    formData.append('image', imageFile);
    const res = await axios.post('http://localhost:4000/upload', formData);
    const imageUrl = res.data.imageUrl;

    await addMovie({ variables: { name, image: imageUrl } });

    setName('');
    setImageFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto my-6">
      <h2 className="text-xl font-bold mb-4">Post a New Movie</h2>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Movie name"
          className="border rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="file"
          className="border p-2"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Upload Movie
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
