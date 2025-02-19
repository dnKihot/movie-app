import React, { Component } from 'react';
import { Card, Typography, Tag} from 'antd';

const  {Title, Paragraph} = Typography
export default class MovieCard extends Component {
  render() {
    const { movie } = this.props;
    return (
      <Card style={{ width: 450, margin: '0 auto'}}>
        <article style={{ display: 'flex', gap: 16 }}>
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            style={{ width: 150, height: 'auto'}}
          />
    
          <div>
            <Title level={5}>{movie.title}</Title>
            <Paragraph type="secondary"> {movie.release_date}</Paragraph>
            <Tag style={{ cursor: 'default', marginBottom:'10px'}}>{movie.popularity}</Tag>
            <Paragraph ellipsis={{rows: 4, tooltip: true}}>{movie.overview}...</Paragraph>
          </div>
        </article>
      </Card>
  );
  }
}  