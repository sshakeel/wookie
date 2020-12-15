import React from 'react';
import styled from 'styled-components';

import { HorizontalMovieListing } from '../styled-components/movieListing';

const MovieSection = styled.section`
  h2 {
    margin-bottom: 10px;
  }
`;

const MovieDetails = styled.div`
  position: fixed;
  left: 50%;
  background: white;
  width: 850px;
  top: 5%;
  margin: 0 auto;
  transform: translateX(-50%);
  border-radius: 5px;
  border-bottom: 1px solid #CCC;
  border-left: 1px solid #CCC;
  border-right: 1px solid #CCC;
  
  button {
    appearance: none;
    box-shadow: none;
    border: none;
    font-size: 32px;
    top: 20px;
    border-radius: 50%;
    padding: 0px 9px;
    position: absolute;
    right: 30px;
    background: #FFF;

  }
  h3 {
    float: left;
    margin: 30px 0 10px;
  }
  img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: block;
    max-width: 100%;
  }

`;

const MovieDetailsContainer = styled.div`
  padding: 0 60px 60px 60px;
`;

const ClearfixedContainer = styled.div`
  &::after {
    content: "";
    display: table;
    clear: both;
  }
`;

const MovieRating = styled.span`
  border: 2px solid #CCC;
  border-radius: 50%;
  float: right;
  margin-top: 20px;
  padding: 14px;
  font-size: 18px;
  font-weight: 600;

`;

const MovieCast = styled.div`
  padding-bottom: 20px;
`;

const CastMember = styled.span`
  &::after {
    content: ", ";
  }
  &:last-child::after {
    content: "";
  }
`;

const Muted = styled.span`
  color: #777;
`;

const MovieMetaData = styled(Muted)`
  display: block;
  padding-bottom: 30px;
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
    this.hideDetails = this.hideDetails.bind(this);
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
          {detailsVisible && (
            <MovieDetails>
              
              <button onClick={this.hideDetails}>×</button>
              <img src={currentMovie.backdrop} alt={currentMovie.title} />
              <MovieDetailsContainer>
                <ClearfixedContainer>
                  <h3>{currentMovie.title}</h3>
                  <MovieRating>{parseFloat(currentMovie.imdb_rating).toFixed(1)}</MovieRating>
                </ClearfixedContainer>
                <MovieMetaData>
                  {new Date(currentMovie.released_on).getFullYear()} | {currentMovie.length} | {currentMovie.director}
                </MovieMetaData>
                <MovieCast>
                  <Muted>Cast:</Muted> {currentMovie.cast.map(eachCast => (<CastMember>{eachCast}</CastMember>))}
                </MovieCast>
                <p>{currentMovie.overview}</p>
              </MovieDetailsContainer>
            </MovieDetails>
          )}
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