import React from 'react';

import styled from 'styled-components';

import { GlobalStyles } from './styled-components/GlobalStyles';
import MovieListing from './components/MovieListing';
// import FetchMovies from './components/FetchMovies';

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


export function App() {
  return (
    <>
      <GlobalStyles />
      <SiteHeader>
        <h1>Wookie Movies 🍿</h1>
        <form>
          <input type="text" name="search" id="search"/>
        </form>
      </SiteHeader>
      <main>
        <MovieListing />
        {/* <FetchMovies /> */}
      </main>
      <footer></footer>
    </>
  );
}

export default App;
