import React, { useState } from 'react';
import axios from 'axios';
import './RecommenderContent.css';

function RecommenderContent() {
    const [songTitle, setSongTitle] = useState('');
    const [populationCount, setPopulationCount] = useState('');
    const [eventType, setEventType] = useState('');
    const [courseName, setCourseName] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');

    const fetchSongRecommendations = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/song-recommender/?song=${songTitle}`);
            setRecommendations(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching song data: ', error);
            setError('Error fetching song data');
        }
    };

    const fetchCityRecommendations = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/city-recommender/?population=${populationCount}`);
            setRecommendations(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching city data: ', error);
            setError('Error fetching city data');
        }
    };

    const fetchEventRecommendations = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/event-recommender/?event_type=${eventType}`);
            setRecommendations(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching event data: ', error);
            setError('Error fetching event data');
        }
    };

    const fetchUniversityRecommendations = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/university-recommender/?course_name=${courseName}`);
            setRecommendations(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching university data: ', error);
            setError('Error fetching university data');
        }
    };

    return (
        <div className="recommend-container">
            <h2>Song Recommendations</h2>
            <input 
                type="text" 
                value={songTitle} 
                onChange={(e) => setSongTitle(e.target.value)} 
                placeholder="Enter a song title" 
            />
            <button onClick={fetchSongRecommendations}>Get Song Recommendations</button>
            {error && <div>Error: {error}</div>}

            <ul>
                {recommendations.map((item, index) => (
                    <li key={index}>{item.song_name} - {item.genre}</li>
                ))}
            </ul>

            <h2>City Recommendations</h2>
            <input 
                type="text" 
                value={populationCount} 
                onChange={(e) => setPopulationCount(e.target.value)} 
                placeholder="Enter a population count" 
            />
            <button onClick={fetchCityRecommendations}>Get City Recommendations</button>
            {error && <div>Error: {error}</div>}
            <ul>
                {recommendations.map((item, index) => (
                    <li key={index}>{item.city_name} - {item.country} - {item.population}</li>
                ))}
            </ul>

            <h2>Event Recommendations</h2>
            <input 
                type="text" 
                value={eventType} 
                onChange={(e) => setEventType(e.target.value)} 
                placeholder="Enter an event type" 
            />
            <button onClick={fetchEventRecommendations}>Get Event Recommendations</button>
            {error && <div>Error: {error}</div>}
            <ul>
                {recommendations.map((item, index) => (
                    <li key={index}>{item.event_name} - {item.location} - {item.event_type}</li>
                ))}
            </ul>

            <h2>University Recommendations</h2>
            <input 
                type="text" 
                value={courseName} 
                onChange={(e) => setCourseName(e.target.value)} 
                placeholder="Enter a course name" 
            />
            <button onClick={fetchUniversityRecommendations}>Get University Recommendations</button>
            {error && <div>Error: {error}</div>}
            <ul>
                {recommendations.map((item, index) => (
                    <li key={index}>{item.university_name} - {item.course_name}</li>
                ))}
            </ul>
        </div>
    );
}

export default RecommenderContent;
