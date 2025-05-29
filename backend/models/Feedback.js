const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  text: String,
  avatar: String, // Random avatar URL
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;