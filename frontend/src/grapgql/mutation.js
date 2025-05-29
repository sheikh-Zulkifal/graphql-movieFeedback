import { gql } from '@apollo/client';

export const ADD_MOVIE = gql`
  mutation AddMovie($name: String!, $image: String!) {
    addMovie(name: $name, image: $image) {
      id
      name
      image
    }
  }
`;

export const ADD_FEEDBACK = gql`
  mutation AddFeedback($movieId: ID!, $text: String!, $avatar: String!) {
    addFeedback(movieId: $movieId, text: $text, avatar: $avatar) {
      id
      text
      avatar
      movieId
    }
  }
`;
