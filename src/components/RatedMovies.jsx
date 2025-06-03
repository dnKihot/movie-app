import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Row, Col, Spin, Alert } from 'antd';
import { getRatedMovies } from '../api/apiService';
import MovieCard from './MovieCard';
import { GenresContext } from '../contexts/GenresContext';

class RatedMovies extends React.Component {
  static contextType = GenresContext;

  static propTypes = {
    sessionId: PropTypes.string,
    ratedMovies: PropTypes.object,
    onRateMovie: PropTypes.func,
  };

  static defaultProps = {
    sessionId: '',
    ratedMovies: {},
    onRateMovie: () => {},
  };

  state = {
    movies: [],
    page: 1,
    totalResults: 0,
    loading: false,
    error: null,
  };

  componentDidMount() {
    if (this.props.sessionId) {
      this.fetchRated();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevProps.sessionId !== this.props.sessionId && this.props.sessionId) ||
      prevState.page !== this.state.page
    ) {
      this.fetchRated();
    }
  }

  fetchRated = async () => {
    const { sessionId } = this.props;
    const { page } = this.state;
    if (!sessionId) return;
    this.setState({ loading: true, error: null });
    try {
      const { movies, totalResults } = await getRatedMovies(sessionId, page);
      this.setState({ movies, totalResults });
    } catch (e) {
      this.setState({ error: 'Error loading rated movies' });
    } finally {
      this.setState({ loading: false });
    }
  };

  handlePageChange = (page) => {
    this.setState({ page });
  };

  render() {
    const { ratedMovies, onRateMovie } = this.props;
    const { genres } = this.context;
    const { movies, page, totalResults, loading, error } = this.state;

    return (
      <div>
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
                rating={movie.rating}
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

export default RatedMovies;
