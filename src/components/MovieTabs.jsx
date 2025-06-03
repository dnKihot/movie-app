import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Alert } from 'antd';
import MovieSearch from './MovieSearch';
import RatedMovies from './RatedMovies';
import { getGuestSession, rateMovie, getRatedMovies } from '../api/apiService';
import { Offline, Online } from 'react-detect-offline';

const { TabPane } = Tabs;

class MovieTabs extends React.Component {
  static propTypes = {};

  state = {
    sessionId: null,
    ratedMovies: {},
    error: null,
  };

  componentDidMount() {
    this.initSession();
  }

  async initSession() {
    try {
      const sessionDataRaw = localStorage.getItem('guestSession');
      if (sessionDataRaw) {
        const sessionData = JSON.parse(sessionDataRaw);
        const now = new Date();
        const expiry = new Date(sessionData.expiresAt);
        if (expiry > now) {
          this.setState({ sessionId: sessionData.id });
          await this.loadRatedMovies(sessionData.id);
          return;
        }
      }
      const newSession = await getGuestSession();
      localStorage.setItem('guestSession', JSON.stringify(newSession));
      this.setState({ sessionId: newSession.id });
      await this.loadRatedMovies(newSession.id);
    } catch (e) {
      this.setState({ error: 'Error while receiving session' });
    }
  }

  loadRatedMovies = async (sessionId) => {
    try {
      const { movies } = await getRatedMovies(sessionId);
      const rated = {};
      movies.forEach((m) => {
        rated[m.id] = m.rating;
      });
      this.setState({ ratedMovies: rated });
    } catch {
      this.setState({ ratedMovies: {} });
    }
  };

  handleRateMovie = async (movieId, rating) => {
    const { sessionId } = this.state;
    if (!sessionId) return;
    try {
      const response = await rateMovie(movieId, rating, sessionId);
      if (response.success) {
        await this.loadRatedMovies(sessionId);
      }
    } catch (e) {
      this.setState({ error: 'Error while setting rating' });
    }
  };

  render() {
    const { sessionId, ratedMovies, error } = this.state;
    return (
      <div>
        <Offline>
          <Alert message="No internet connection." type="error" showIcon />
        </Offline>
        <Online>
          <Tabs defaultActiveKey="search" centered>
            <TabPane tab="Search" key="search">
              <MovieSearch
                ratedMovies={ratedMovies}
                onRateMovie={this.handleRateMovie}
              />
            </TabPane>
            <TabPane tab="Rated" key="rated">
              <RatedMovies
                sessionId={sessionId}
                ratedMovies={ratedMovies}
                onRateMovie={this.handleRateMovie}
              />
            </TabPane>
          </Tabs>
          {error && (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <Alert message={error} type="error" showIcon />
            </div>
          )}
        </Online>
      </div>
    );
  }
}

export default MovieTabs;
