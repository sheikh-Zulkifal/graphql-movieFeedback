import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FEEDBACK } from '../grapgql/mutation';
import { GET_MOVIES } from '../grapgql/quries';

const FeedbackModal = ({ movie, onClose }) => {
  const [text, setText] = useState('');
  const [addFeedback, { loading }] = useMutation(ADD_FEEDBACK, {
    refetchQueries: [{ query: GET_MOVIES }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomAvatar = `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 1000)}`;
    
    try {
      await addFeedback({
        variables: {
          movieId: movie.id,
          text,
          avatar: randomAvatar,
        },
      });
      setText('');
      onClose(); // close modal after submission
    } catch (error) {
      console.error("Failed to add feedback:", error);
    }
  };

  return (
   <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded-xl w-96 max-h-[90vh] overflow-y-auto relative shadow-lg animate-fade-in">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4">{movie.name}</h2>

        <div className="space-y-3 mb-4">
          {movie.feedback.length > 0 ? (
            movie.feedback.map((fb) => (
              <div key={fb.id} className="flex items-center gap-3 bg-gray-100 p-2 rounded">
                <img src={fb.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                <p>{fb.text}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No reviews yet.</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            rows="3"
            className="border rounded p-2"
            placeholder="Add your feedback..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
