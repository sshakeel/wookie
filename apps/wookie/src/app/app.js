import React from 'react';

import styled from 'styled-components';

import { GlobalStyles } from './styled-components/GlobalStyles';
import MovieListing from './components/MovieListing';
import SearchResults from './components/SearchResults';

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
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearch(event) {
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
    this.forceUpdate();

  }

  handleSubmit(event) {
    this.handleSearch(event);
    event.preventDefault();
  }

  render() {
    const { searching, searchTerm } = this.state;

    return (
      <>
        <GlobalStyles />
        <SiteHeader>
          <h1>Wookie Movies <span role="img" aria-label="popcorn emoji">🍿</span></h1>
          <form onSubmit={this.handleSubmit}>
            <input
              id="search"
              name="search"
              onChange={this.handleSearch}
              type="text"
              value={searchTerm}
            />
          </form>
        </SiteHeader>
        <main>
          {!searching && (
            <MovieListing />
          )}
          {searching && (
            <div>
              <p>Results for '{searchTerm}'</p>
              <SearchResults query={searchTerm} />
            </div>
          )}
        </main>
        <footer></footer>
      </>
    )
  }
  
}

export default App;
