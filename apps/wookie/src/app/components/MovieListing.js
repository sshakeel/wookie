import React from 'react';
import styled from 'styled-components';

import { HorizontalMovieListing } from '../styled-components/movieListing';

const MovieSection = styled.section`
  h2 {
    margin-bottom: 10px;
  }
`;

class MovieListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      movies: []
    };

    this.listMovieFromCategory = this.listMovieFromCategory.bind(this);
  }

  componentDidMount() {
    fetch('https://wookie.codesubmit.io/movies', {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer Wookie2019'
        })
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          movies: result.movies
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  listMovieFromCategory(category) {
    const { movies } = this.state;
    let movieMarkup = [];

    movies.map(movie => {
      if(movie.genres.includes(category)) {
        movieMarkup.push(
          <li key={movie.id}>
            <img src={movie.poster} alt={movie.title}/>
          </li>
        );
      }
    })

    return movieMarkup;
  }

  render() {
    const { error, isLoaded, movies } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const categories = []; // category = genre, this array collects unique genres
      console.log(movies);
      movies.map(movie => {
        movie.genres.map(genre => {
          if (!categories.includes(genre)) {
            categories.push(genre);
          }
        })
      })
      return (
        categories.map(category => (
          <MovieSection>
            <h2>{category}</h2>
            <HorizontalMovieListing>
              {this.listMovieFromCategory(category)}
            </HorizontalMovieListing>
          </MovieSection>
        ))
      )
    }
  }
}
export default MovieListing;