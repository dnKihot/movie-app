import React from 'react';
import { Card, Typography, Tag } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function MovieCard({ movie = {} }) {
  const {
    title = 'Unknown',
    release_date = 'Unknown',
    poster_path,
    popularity = 'N/A',
    overview = 'No description available.',
  } = movie;

  return (
    <Card style={{ maxWidth: 450, margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease-in-out'}}>
      <article style={{ display: 'flex', gap: 16 }}>
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${poster_path}`}
            alt={title}
            style={{ width: 150, height: 'auto' }}
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
              style={{ fontSize: '150px', color: '#1bb8d8' }}
            />
          </div>
        )}

        <div>
          <Title level={5}>{title}</Title>
          <Paragraph type="secondary">{release_date}</Paragraph>
          <Tag style={{ cursor: 'default', marginBottom: '10px' }}>
            {popularity}
          </Tag>
          <Paragraph ellipsis={{ rows: 4, tooltip: true }}>
            {overview}
          </Paragraph>
        </div>
      </article>
    </Card>
  );
}

export default MovieCard;
