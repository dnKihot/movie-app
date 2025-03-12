import React, { Component } from 'react';
import { Pagination, Row, Col, Spin, Alert, Input } from 'antd';
import { getMovies } from '../api/apiService';
import MovieCard from './MovieCard';
import { Offline, Online } from 'react-detect-offline';
import debounce from 'lodash/debounce';

class MovieList extends Component {
  state = {
    movies: [],
    loading: false,
    error: null,
    query: '',
    currentPage: 1, 
    totalPages: 0, 
    totalResults: 0, 
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async (page = 1) => {
    this.setState({ loading: true, error: null });

    try {
      const { movies, totalPages, totalResults, error } = await getMovies(
        this.state.query || 'return',
        page,
      );
      this.setState({
        movies,
        totalPages,
        totalResults,
        loading: false,
        currentPage: page, 
      });
    } catch {
      this.setState({ error: 'Failed to load movies.', loading: false });
    }
  };

  debouncedFetchMovies = debounce(this.fetchMovies, 500);

  handleSearchChange = (e) => {
    this.setState({ query: e.target.value }, () => {
      this.debouncedFetchMovies(1); 
    });
  };

  handlePageChange = (page) => {
    this.fetchMovies(page); 
  };

  render() {
    const { movies, loading, error, query, totalPages, currentPage } =
      this.state;

    return (
      <div>
        <Offline>
          <Alert message="No internet connection." type="error" showIcon />
        </Offline>
        <Online>
          <Input
            placeholder="Search movies..."
            value={query}
            onChange={this.handleSearchChange}
            style={{ margin: '30px 24px', width: '95%' }}
          />
          {loading && (
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <Spin />
            </div>
          )}
          <Row gutter={[16, 16]} justify="center">
            {movies.map((movie) => (
              <Col key={movie.id} xs={24} sm={24} md={12} lg={12} xl={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          {error && (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <Alert message={error} type="error" showIcon />
            </div>
          )}
          <div style={{display: 'flex', justifyContent: 'center', margin: '30px'}}>
            <Pagination
              current={currentPage}
              total={totalPages} 
              pageSize={20} 
              onChange={this.handlePageChange}
              showSizeChanger={false}
              showQuickJumper
            />
          </div>
          
        </Online>
      </div>
    );
  }
}

export default MovieList;
