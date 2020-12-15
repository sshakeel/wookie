import styled from 'styled-components';

export const HorizontalMovieListing = styled.ul`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  li {
    display: inline-block;
    margin-right: 10px;
    &::last-child {
      margin-right: 0;
    }
    img {
      border-radius: 15px;
      height: 250px;
    }
  }
`;

export const GridMovieListing = styled.ul`
  li {
    display: inline-block;
    margin-bottom: 60px;
    margin-right: 10px;
    &::last-child {
      margin-right: 0;
    }
    img {
      border-radius: 15px;
      height: 250px;
    }
  }
`;