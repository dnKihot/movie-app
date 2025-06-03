import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Tag, Rate } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

class MovieCard extends React.Component {
  static propTypes = {
    movie: PropTypes.object,
    rating: PropTypes.number,
    onRateMovie: PropTypes.func,
    genres: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    movie: {},
    rating: 0,
    onRateMovie: () => {},
    genres: [],
  };

  getRatingColor = (rating) => {
    if (rating >= 7) return '#66E900';
    if (rating >= 5) return '#E9D100';
    if (rating >= 3) return '#E97E00';
    return '#E90000';
  };

  formatDate = (dateString) => {
    if (!dateString || dateString === 'Unknown') return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  render() {
    const { movie, rating, onRateMovie, genres } = this.props;
    const {
      title = 'Unknown',
      release_date = 'Unknown',
      poster_path,
      overview = 'No description available.',
      vote_average = 0,
      genre_ids = [],
    } = movie;

    const movieGenres = genre_ids
      .map((id) => genres.find((genre) => genre.id === id))
      .filter(Boolean)
      .map((genre) => genre.name);

    return (
      <Card
        style={{
          maxWidth: 450,
          minHeight: 290,
          margin: '0 auto',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.3s ease-in-out',
          position: 'relative',
        }}
        hoverable
      >
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 35,
            height: 35,
            borderRadius: '50%',
            backgroundColor: this.getRatingColor(vote_average),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            fontWeight: 'bold',
            border: '2px solid white',
          }}
        >
          {vote_average.toFixed(1)}
        </div>
        <article style={{ display: 'flex', gap: 16 }}>
          {poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${poster_path}`}
              alt={title}
              style={{ width: 150, height: 'auto', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: 150,
                height: 225,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0d253f',
              }}
            >
              <FileImageOutlined
                style={{ fontSize: '100px', color: '#1bb8d8' }}
              />
            </div>
          )}
          <div>
            <Title level={5}>{title}</Title>
            <Paragraph type="secondary">
              {this.formatDate(release_date)}
            </Paragraph>
            <div style={{ marginBottom: '10px' }}>
              {movieGenres.map((genre) => (
                <Tag key={genre} style={{ marginBottom: '5px' }}>
                  {genre}
                </Tag>
              ))}
            </div>
            <Paragraph ellipsis={{ rows: 3, tooltip: true }}>
              {overview}
            </Paragraph>
            <Rate
              count={10}
              value={rating}
              onChange={onRateMovie}
              allowClear={false}
              style={{ fontSize: 15 }}
            />
          </div>
        </article>
      </Card>
    );
  }
}

export default MovieCard;
