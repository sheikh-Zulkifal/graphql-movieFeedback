const Feedback = require("../models/Feedback");
const Movie = require("../models/Movie");

module.exports= {
    Query:{
        movies: async ()=> await Movie.find(),
        movie: async () => await Movie.findById(id),
    },
    Mutation:{

        addMovie: async (_, {name, image}) =>{
             const movie = new Movie({name, image});
             return await movie.save()
        },

        addFeedback: async (_,{movieId, text,avatar}) => {
            const feedback = new Feedback({movieId, text, avatar});
            return await feedback.save();
        }
    },

    Movie:{
        feedback: async(parent) =>{ 
            return await Feedback.find({movieId: parent.id})
        }
    }
}