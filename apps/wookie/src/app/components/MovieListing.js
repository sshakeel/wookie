import React from 'react';
import styled from 'styled-components';

import { HorizontalMovieListing } from '../styled-components/movieListing';

const MovieSection = styled.section`
  h2 {
    margin-bottom: 10px;
  }
`;

const MovieDetails = styled.div`
  display: ${props => props.visible ? 'block' : 'none'};
  img {
    max-width: 500px;
  }
`;

class MovieListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      movies: [],
      detailsVisible: false,
      currentMovie: {},
    };

    this.listMovieFromCategory = this.listMovieFromCategory.bind(this);
    this.displayDetails = this.displayDetails.bind(this);
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

  displayDetails(movie) {
    const { detailsVisible } = this.state;

    if(!detailsVisible) {
      this.setState({
        currentMovie: movie,
        detailsVisible: true,
      });
    }
    // this.renderMovieDetails(movie);
  }

  hideDetails() {
    this.setState({
      currentMovie: {},
      detailsVisible: false,
    })
  }

  listMovieFromCategory(category) {
    const { movies } = this.state;
    let movieMarkup = [];

    movies.map(movie => {
      if(movie.genres.includes(category)) {
        movieMarkup.push(
          <li key={movie.id} onClick={()=>this.displayDetails(movie)}>
            <img src={movie.poster} alt={movie.title}/>
          </li>
        );
      }
    })

    return movieMarkup;
  }

  render() {
    const { currentMovie, detailsVisible, error, isLoaded, movies } = this.state;
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
        <div>
          <MovieDetails visible={detailsVisible} >
            <img src={currentMovie.backdrop} alt={currentMovie.title} onClick={()=>this.hideDetails}/>
          </MovieDetails>
          {categories.map(category => (
            <MovieSection>
              <h2>{category}</h2>
              <HorizontalMovieListing>
                {this.listMovieFromCategory(category)}
              </HorizontalMovieListing>
            </MovieSection>
          ))}
        </div>
       
      )
    }
  }
}
export default MovieListing;