import React from 'react';

import { HorizontalMovieListing } from '../styled-components/movieListing';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      results: []
    };

    this.fetchSearchResults = this.fetchSearchResults.bind(this);
  }

  fetchSearchResults(query) {
    fetch('https://wookie.codesubmit.io/movies?q=' + query, {
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
          results: result.movies
        });
        console.log(result);
        console.log('query: '+query);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
    this.forceUpdate();
  }

  componentDidMount() {
    this.fetchSearchResults(this.props.query);
  }

  render() {
    // const { query } = this.props;
    const { results } = this.state;
    return (
      <HorizontalMovieListing>
        {results.map(movie => (
          <li key={movie.id}>
            <img src={movie.poster} alt={movie.title}/>
          </li>
        ))}
      </HorizontalMovieListing>
    );
  }
}

export default SearchResults;