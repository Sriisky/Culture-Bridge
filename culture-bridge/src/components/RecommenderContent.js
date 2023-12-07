import React, { useState } from 'react';
import axios from 'axios';

function RecommenderContent() {
    const [songTitle, setSongTitle] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');

    const fetchRecommendations = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/song-recommender/?song=${songTitle}`);
            setRecommendations(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching data: ', error);
            setError('Error fetching data');
        }
    };

    return (
        <div className="benefits-container">
            <input 
                type="text" 
                value={songTitle} 
                onChange={(e) => setSongTitle(e.target.value)} 
                placeholder="Enter a song title" 
            />
            <button onClick={fetchRecommendations}>Get Recommendations</button>

            {error && <div>Error: {error}</div>}

            <h1>Recommendations</h1>
            <ul>
                {recommendations.map((item, index) => (
                    <li key={index}>{item.song_name} - {item.genre}</li>
                ))}
            </ul>
        </div>
    );
}

export default RecommenderContent;
