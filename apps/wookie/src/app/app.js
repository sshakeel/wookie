import React from 'react';

import styled from 'styled-components';

import { GlobalStyles } from './styled-components/GlobalStyles';
import { GridMovieListing } from './styled-components/movieListing';
import MovieListing from './components/MovieListing';

const SiteHeader = styled.header`
  border-bottom: 1px solid #CCC;
  &::after {
    content: "";
    display: table;
    clear: both;
  }
  h1 {
    float: left;
  }
  form {
    float: right;
  }
`;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      searchTerm: '',
      error: null,
      isLoaded: false,
      results: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log('result: '+result);
        console.log('query: '+query);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }


  handleSearch = async (event) => {
    const { searchTerm } = this.state;

    const userInput = event.target.value;
    console.log('userInput: '+userInput);
    if(userInput) {   // if the search value isn't empty
      this.setState({
        searching: true,
        searchTerm: userInput,
      });
    } else {
      this.setState({
        searching: false,
        searchTerm: '',
      });
    }
    this.fetchSearchResults(searchTerm);
    this.forceUpdate();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleSearch(event);
  }

  render() {
    const { results, searching, searchTerm } = this.state;

    return (
      <>
        <GlobalStyles />
        <SiteHeader>
          <h1>Wookie Movies <span role="img" aria-label="popcorn emoji">🍿</span></h1>
          <form onSubmit={this.handleSubmit}>
            <input
              id="search"
              name="search"
              onChange={e => this.handleSearch(e)}
              type="text"
              value={searchTerm}
            />
          </form>
        </SiteHeader>
        <main>
          {!searching && (
            <MovieListing />
          )}
          {searching && results && (
            <div>
              <p>Results for '{searchTerm}'</p>
              <GridMovieListing>
                {results.map(movie => (
                  <li key={movie.id}>
                    <img src={movie.poster} alt={movie.title}/>
                  </li>
                ))}
              </GridMovieListing>
            </div>
          )}
        </main>
        <footer></footer>
      </>
    )
  }
  
}

export default App;
