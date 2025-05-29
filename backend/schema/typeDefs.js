const { gql } = require("apollo-server-express");

module.exports = gql`
  type Movie {
    id: ID!
    name: String!
    image: String!
    feedback: [Feedback]
  }

  type Feedback {
    id: ID!
    text: String!
    avatar: String!
    movieId: ID!
  }

  type Query {
    movies: [Movie]
    movie(id: ID!): Movie
  }

  type Mutation {
    addMovie(name: String!, image: String!): Movie
    addFeedback(movieId: ID!, text: String!, avatar: String!): Feedback
  }
`;
