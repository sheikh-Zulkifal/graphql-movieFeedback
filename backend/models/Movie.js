const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: String,
  image: String, // URL of image
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
