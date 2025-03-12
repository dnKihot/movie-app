import React from 'react';
import MovieList from './components/MovieList';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MovieList />
      </div>
    );
  }
}
