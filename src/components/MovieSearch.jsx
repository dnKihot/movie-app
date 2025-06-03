import React from 'react';
import PropTypes from 'prop-types';
import { Input, Pagination, Row, Col, Spin, Alert } from 'antd';
import debounce from 'lodash/debounce';
import { getMovies } from '../api/apiService';
import MovieCard from './MovieCard';
import { GenresContext } from '../contexts/GenresContext';

class MovieSearch extends React.Component {
  static contextType = GenresContext;

  static propTypes = {
    ratedMovies: PropTypes.object,
    onRateMovie: PropTypes.func,
  };

  static defaultProps = {
    ratedMovies: {},
    onRateMovie: () => {},
  };

  state = {
    query: '',
    movies: [],
    page: 1,
    totalResults: 0,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchMoviesDebounced = debounce(this.fetchMovies, 500);
    this.fetchMovies();
  }

  componentWillUnmount() {
    this.fetchMoviesDebounced.cancel();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchMoviesDebounced();
    }
  }

  fetchMovies = async () => {
    const { query, page } = this.state;
    this.setState({ loading: true, error: null });
    try {
      const { movies, totalResults } = await getMovies(query || 'return', page);
      this.setState({ movies, totalResults });
    } catch (e) {
      this.setState({ error: 'Error loading movies' });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = (e) => {
    this.setState({ query: e.target.value, page: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ page });
  };

  render() {
    const { ratedMovies, onRateMovie } = this.props;
    const { genres } = this.context;
    const { query, movies, page, totalResults, loading, error } = this.state;

    return (
      <div>
        <Input
          placeholder="Search movies..."
          value={query}
          onChange={this.handleSearch}
          style={{ margin: '30px 24px', width: '95%' }}
        />
        {loading && (
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <Spin />
          </div>
        )}
        {error && (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <Alert message={error} type="error" showIcon />
          </div>
        )}
        <Row gutter={[16, 16]} justify="center">
          {movies.map((movie) => (
            <Col key={movie.id} xs={24} sm={24} md={12} lg={12} xl={12}>
              <MovieCard
                movie={movie}
                rating={ratedMovies[movie.id]}
                onRateMovie={(rating) => onRateMovie(movie.id, rating)}
                genres={genres}
              />
            </Col>
          ))}
        </Row>
        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}
        >
          <Pagination
            current={page}
            total={totalResults}
            pageSize={20}
            onChange={this.handlePageChange}
            showSizeChanger={false}
            showQuickJumper
          />
        </div>
      </div>
    );
  }
}

export default MovieSearch;
