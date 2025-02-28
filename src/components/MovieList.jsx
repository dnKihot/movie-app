import React, { Component } from 'react';
import { Row, Col, Spin, Alert } from 'antd';
import { getMovies } from './apiService';
import MovieCard from './MovieCard';
import { Offline, Online } from 'react-detect-offline';

class MovieList extends Component {
  state = {
    movies: [],
    loading: true,
    error: null,
  };

  async componentDidMount() {
    const { movies, error } = await getMovies();
    this.setState({ movies, error, loading: false });
  }

  render() {
    const { movies, loading, error } = this.state;

    if (loading) {
      return (
        <div className="loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin className="ant-spin-lg" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="error" style={{ padding: '20px', textAlign: 'center' }}>
          <Alert message={error} type="error" showIcon />
        </div>
      );
    }

    return (
      <div>
        <Offline>
          <Alert message="No internet connection. Please check your network." type="error" showIcon />
        </Offline>

        <Online>
          <Row gutter={[16, 16]} justify="center">
            {movies.map((movie) => (
              <Col xs={24} sm={24} md={12} lg={12} xl={12} key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </Online>
      </div>
    );
  }
}

export default MovieList;
