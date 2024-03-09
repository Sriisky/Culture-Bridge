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
    const [selections, setSelections] = useState({
        genres: [],
        events: [],
        courses: [],
        traits: []
    });

    // Update handleSelect to work with the new state structure
    const handleSelect = (category, value) => {
        setSelections(prevSelections => {
            const newSelections = { ...prevSelections };
            if (newSelections[category].includes(value)) {
                newSelections[category] = newSelections[category].filter(item => item !== value);
            } else {
                newSelections[category].push(value);
            }
            return newSelections;
        });
    };

    // Check if a value is selected in a specific category
    const isSelected = (category, value) => {
        return selections[category].includes(value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/process-recommendations/`, selections);
            console.log(response.data); // Handle the response data as needed
            //setRecommendations(response.data); // Assuming you want to set the recommendations to state
        } catch (error) {
            console.error('Error submitting recommendations: ', error);
            setError('Error fetching recommendations');
        }
    };

    /*
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
 */

    return (
        <div className="recommend-container">
            <div className='recc-intro'>
            <h1>Get Recommendations</h1>
                <p>In this section, you have the chance to explore cities that match your
                    interests. Below there are several bubbles that contain music genres, event types, university
                    courses and adjectives describing city life. You can select as many or as few bubbles as you like.
                    Once you are happy with your selection, click on the 'submit' button and we will return
                    cities that closely match your selections. This is to act as an aid in your decision making process
                    for Erasmus. It aims to help you to explore cities you may not have considered yet and to give you 
                    a starting point for researching the cities available to you.
                </p>
            </div>
            <div className='bubble-select'>
                <h2>Types of Music</h2>
                <div className="button-group">
                    <button className={`rounded-button ${isSelected('genres', 'Hip Hop/Rap') ? 'selected' : ''}`} onClick={() => handleSelect('genres', 'Hip Hop/Rap')}>Hip Hop/ Rap</button>
                    <button className={`rounded-button ${isSelected('genres', 'Pop') ? 'selected' : ''}`} onClick={() => handleSelect('genres', 'Pop')}>Pop</button>
                    <button className={`rounded-button ${isSelected('genres', 'Electronic') ? 'selected' : ''}`} onClick={() => handleSelect('genres', 'Electronic')}>Electronic</button>
                    <button className={`rounded-button ${isSelected('genres', 'Rock') ? 'selected' : ''}`} onClick={() => handleSelect('genres', 'Rock')}>Rock</button>
                    <button className={`rounded-button ${isSelected('genres', 'Reggae') ? 'selected' : ''}`} onClick={() => handleSelect('genres', 'Reggae')}>Reggae</button>
                </div>

                <h2>Types of Live Events</h2>
                <div className="button-group">
                    {/* Note: Assuming 'events' is the intended category for these selections */}
                    <button className={`rounded-button ${isSelected('events', 'Rock') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Rock')}>Rock</button>
                    <button className={`rounded-button ${isSelected('events', 'Hard Rock') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Hard Rock')}>Hard Rock</button>
                    <button className={`rounded-button ${isSelected('events', 'Pop') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Pop')}>Pop</button>
                    <button className={`rounded-button ${isSelected('events', 'Electronic') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Electronic')}>Electronic</button>
                    <button className={`rounded-button ${isSelected('events', 'Indie') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Indie')}>Indie</button>
                    <button className={`rounded-button ${isSelected('events', 'Festivals') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Festivals')}>Festivals</button>
                    <button className={`rounded-button ${isSelected('events', 'Classical') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Classical')}>Classical</button>
                    <button className={`rounded-button ${isSelected('events', 'Blues') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Blues')}>Blues</button>
                    <button className={`rounded-button ${isSelected('events', 'Jazz') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Jazz')}>Jazz</button>
                    <button className={`rounded-button ${isSelected('events', 'Hip Hop Rap') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Hip Hop Rap')}>Hip Hop/Rap</button>
                    <button className={`rounded-button ${isSelected('events', 'Theatre') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Theatre')}>Theatre</button>
                    <button className={`rounded-button ${isSelected('events', 'Metal') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Metal')}>Metal</button>
                    <button className={`rounded-button ${isSelected('events', 'World') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'World')}>World Music</button>
                </div>

                <h2>University Courses</h2>
                <div className="button-group">
                    <button className={`rounded-button ${isSelected('courses', 'Computer Science') ? 'selected' : ''}`} onClick={() => handleSelect('courses', 'Computer Science')}>Computer Science</button>
                    <button className={`rounded-button ${isSelected('courses', 'Information Technology') ? 'selected' : ''}`} onClick={() => handleSelect('courses', 'Information Technology')}>Information Technology</button>
                    <button className={`rounded-button ${isSelected('courses', 'Art Design') ? 'selected' : ''}`} onClick={() => handleSelect('courses', 'Art Design')}>Art and Design</button>
                    <button className={`rounded-button ${isSelected('courses', 'Architecture') ? 'selected' : ''}`} onClick={() => handleSelect('courses', 'Architecture')}>Architecture</button>
                    <button className={`rounded-button ${isSelected('courses', 'Business Studies') ? 'selected' : ''}`} onClick={() => handleSelect('courses', 'Business Studies')}>Business Studies</button>
                    <button className={`rounded-button ${isSelected('courses', 'Engineering') ? 'selected' : ''}`} onClick={() => handleSelect('courses', 'Engineering')}>Engineering</button>
                    <button className={`rounded-button ${isSelected('courses', 'Marketing') ? 'selected' : ''}`} onClick={() => handleSelect('courses', 'Marketing')}>Marketing</button>
                </div>

                <h2>City Traits</h2>
                <div className="button-group">
                    <button className={`rounded-button ${isSelected('traits', 'Busy') ? 'selected' : ''}`} onClick={() => handleSelect('traits', 'Busy')}>Busy</button>
                    <button className={`rounded-button ${isSelected('traits', 'Lively') ? 'selected' : ''}`} onClick={() => handleSelect('traits', 'Lively')}>Lively</button>
                    <button className={`rounded-button ${isSelected('traits', 'Quiet') ? 'selected' : ''}`} onClick={() => handleSelect('traits', 'Quiet')}>Quiet</button>
                    <button className={`rounded-button ${isSelected('traits', 'Cultural Sites') ? 'selected' : ''}`} onClick={() => handleSelect('traits', 'Cultural Sites')}>Cultural Sites</button>
                    <button className={`rounded-button ${isSelected('traits', 'Bars and Clubs') ? 'selected' : ''}`} onClick={() => handleSelect('traits', 'Bars and Clubs')}>Bars and Clubs</button>
                    <button className={`rounded-button ${isSelected('traits', 'Live Events') ? 'selected' : ''}`} onClick={() => handleSelect('traits', 'Live Events')}>Live Events</button>
                </div>
                <button className='recc-submit' onClick={handleSubmit}>Submit</button>
            </div>

            
            <div className="recommend-return">
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
        </div>
    );
}

export default RecommenderContent;
