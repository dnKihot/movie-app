import React from 'react';
import PropTypes from 'prop-types';
import { getGenres } from '../api/apiService';

export const GenresContext = React.createContext({
  genres: [],
  loading: false,
  error: null,
});

export class GenresProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    genres: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchGenres();
  }

  async fetchGenres() {
    try {
      const genresData = await getGenres();
      this.setState({
        genres: genresData,
        loading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        error: 'Failed to load movie genres',
        loading: false,
      });
    }
  }

  render() {
    const { children } = this.props;
    const { genres, loading, error } = this.state;
    return (
      <GenresContext.Provider value={{ genres, loading, error }}>
        {children}
      </GenresContext.Provider>
    );
  }
}
