import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      name
      image
      feedback {
        id
        text
        avatar
      }
    }
  }
`;

export const GET_MOVIE_BY_ID = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      id
      name
      image
      feedback {
        id
        text
        avatar
      }
    }
  }
`;

