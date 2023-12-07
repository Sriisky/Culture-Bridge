import axios from 'axios';

export const getSongRecommendations = (songTitle) => {
    return axios.get(`http://localhost:8000/api/song-recommender/?song=${songTitle}`);
  };
