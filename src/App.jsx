import React from 'react';
import PropTypes from 'prop-types';
import { GenresProvider } from './contexts/GenresContext';
import MovieTabs from './components/MovieTabs';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    return (
      <GenresProvider>
        <MovieTabs />
      </GenresProvider>
    );
  }
}

export default App;
