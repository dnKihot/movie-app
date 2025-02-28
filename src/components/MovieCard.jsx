import React from "react";
import { Card, Typography, Tag, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const customSpin = <LoadingOutlined spin />;

function MovieCard({ movie = {} }) {
  const {
    title = "Unknown",
    release_date = "Unknown",
    poster_path,
    popularity = "N/A",
    overview = "No description available.",
  } = movie;

  return (
    <Card style={{ width: 450, margin: "0 auto" }}>
      <article style={{ display: "flex", gap: 16 }}>
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${poster_path}`}
            alt={title}
            style={{ width: 150, height: "auto" }}
          />
        ) : (
          <Spin indicator={customSpin} size="large" />
        )}

        <div>
          <Title level={5}>{title}</Title>
          <Paragraph type="secondary">{release_date}</Paragraph>
          <Tag style={{ cursor: "default", marginBottom: "10px" }}>{popularity}</Tag>
          <Paragraph ellipsis={{ rows: 4, tooltip: true }}>{overview}</Paragraph>
        </div>
      </article>
    </Card>
  );
}

export default MovieCard;
