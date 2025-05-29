import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { ADD_MOVIE } from '../grapgql/mutation';

export default function AddMovie() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [addMovie] = useMutation(ADD_MOVIE);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert('Please upload an image');

    const formData = new FormData();
    formData.append('image', image);

    const uploadRes = await axios.post('http://localhost:4000/upload', formData);
    const imageUrl = uploadRes.data.imageUrl;

    await addMovie({ variables: { name, image: imageUrl } });
    setName('');
    setImage(null);
    alert('Movie added!');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold">Add Movie</h2>
      <input
        type="text"
        placeholder="Movie Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Movie
      </button>
    </form>
  );
}
