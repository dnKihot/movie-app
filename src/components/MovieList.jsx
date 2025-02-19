import React, { Component } from 'react';
import axios from 'axios';
import {Row, Col, Spin } from 'antd';
import MovieCard from './MovieCard';

const API_KEY = 'a3f1f58a6268353d9049816704dd90d4';  
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=return`;

class MovieList extends Component {
  state = {
    movies: [],
    loading: true,
  };

  _isMounted = false;

  async componentDidMount() {
    this._isMounted = true;
    try {
      const res = await axios.get(API_URL);
      if (this._isMounted) this.setState({ movies: res.data.results, loading: false });
      
    } catch (error) {
      console.error('Error fetching data: ', error);
      if (this._isMounted) this.setState({ loading: false });;
    }
  }
  

  render() {
    const { movies, loading } = this.state;
    if (loading) {
      return (
        <div className="loading">
          <Spin size="large" />
        </div>
      );
    }
    return (
      <Row style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '12px', 
        justifyContent: 'center', 
        margin: '0 auto', 
        maxWidth: '1200px' 
      }}>
        {movies.map((movie) => (
        <Col  xs={24} sm={24} md={12} lg={12} xl={12}>
          <MovieCard key={movie.id} movie={movie}/>
        </Col>))}
      </Row>
    );
  }
}

export default MovieList;
