import React, { useState } from 'react';
import axios from 'axios';

export default function MovieForm({ onMovieAdded }) {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Please upload an image');
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const res = await axios.post('http://localhost:4000/upload', formData);
      const imageUrl = res.data.imageUrl;

      // Call the parent callback with movie data
      await onMovieAdded({ name, image: imageUrl });

      // Reset form
      setName('');
      setImageFile(null);
      setPreview(null);
      alert('Movie added successfully!');
    } catch (err) {
      alert('Failed to upload movie. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4">🎬 Add a New Movie</h2>

      <div className="space-y-1">
        <label htmlFor="movieName" className="block text-sm font-semibold text-gray-700">Movie Name</label>
        <input
          id="movieName"
          type="text"
          placeholder="e.g. Inception"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="movieImage" className="block text-sm font-semibold text-gray-700">Movie Poster</label>
        <input
          id="movieImage"
          type="file"
          accept="image/*"
          className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
          onChange={handleImageChange}
          required
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 rounded-lg w-36 h-36 object-cover border shadow"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition flex justify-center items-center gap-2 ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
        }`}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        {loading ? 'Uploading...' : 'Upload Movie'}
      </button>
    </form>
  );
}
