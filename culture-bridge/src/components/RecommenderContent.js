import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecommenderContent.css';
import { cityInfos } from './CityDetails';
import CityData from './CityData';

function RecommenderContent() {
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');
    const [cityRecommendations, setCityRecommendations] = useState([]);
    const [selections, setSelections] = useState({
        genres: [],
        events: [],
        courses: [],
        traits: []
    });
    useEffect(() => {
        const savedRecommendations = sessionStorage.getItem('cityRecommendations');
        if (savedRecommendations) {
            setCityRecommendations(JSON.parse(savedRecommendations));
        }
    }, []);

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
            console.log(response.data);
            // Assuming the API returns the expected format
            setRecommendations(response.data);
            // Map to city recommendations
            mapRecommendationsToCities(response.data);
        } catch (error) {
            console.error('Error submitting recommendations: ', error);
            setError('Error fetching recommendations');
        }
    };
    

    const mapRecommendationsToCities = (recommendations) => {
        const mappedCities = recommendations.map(rec => {
            const { Location, AssociatedUniversities } = rec;
            let cityName = ""; // Default city name
            // Completed mappings
            if (Location === 'DE' && AssociatedUniversities.includes('OTH')) {
                cityName = "Regensburg, Germany";
            } else if (Location === 'DE' && AssociatedUniversities.includes('HDA')) {
                cityName = "Darmstadt, Germany";
            } else if (Location === 'NL') {
                cityName = "Zwolle, Netherlands";
            } else if (Location === 'FI') {
                cityName = "Oulo, Finland";
            } else if (Location === 'SE') {
                cityName = "Vasteras, Sweden";
            } else if (Location === 'CH') {
                cityName = "Zurich, Switzerland";
            } else if (Location === 'NO') {
                cityName = "Grimstad/Kristiansand, Norway";
            } else if (Location === 'AT') {
                cityName = "Kufstein, Austria";
            } else if (Location === 'HR') {
                cityName = "Dubrovnik/Zagreb, Croatia";
            } else if (Location === 'SK') {
                cityName = "Zilina, Slovakia";
            } else if (Location === 'ES') {
                cityName = "Barcelona, Spain";
            } else if (Location === 'SI') {
                cityName = "Ljubljana, Slovenia";
            } else if (Location === 'IT') {
                cityName = "Perugia, Italy";
            }
    
            // Find the city in cityInfos using the cityName
            const cityInfo = cityInfos.find(info => info.heading.includes(cityName));
            return cityInfo;
        }).filter(city => city !== undefined); // Filter out undefined mappings
    
        setCityRecommendations(mappedCities);

        // Save to sessionStorage
        sessionStorage.setItem('cityRecommendations', JSON.stringify(mappedCities));
    };
    

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
                    <button className={`rounded-button ${isSelected('genres', 'Hip hop/Rap/R&b') ? 'selected' : ''}`} onClick={() => handleSelect('genres', 'Hip hop/Rap/R&b')}>Hip Hop/ Rap</button>
                    <button className={`rounded-button ${isSelected('genres', 'Pop') ? 'selected' : ''}`} onClick={() => handleSelect('genres', 'Pop')}>Pop</button>
                    <button className={`rounded-button ${isSelected('genres', 'EDM') ? 'selected' : ''}`} onClick={() => handleSelect('genres', 'EDM')}>Electronic</button>
                    <button className={`rounded-button ${isSelected('genres', 'Rock/Metal') ? 'selected' : ''}`} onClick={() => handleSelect('genres', 'Rock/Metal')}>Rock</button>
                    <button className={`rounded-button ${isSelected('genres', 'Latin/Reggaeton') ? 'selected' : ''}`} onClick={() => handleSelect('genres', 'Latin/Reggaeton')}>Reggae</button>
                </div>

                <h2>Types of Live Events</h2>
                <div className="button-group">
                    <button className={`rounded-button ${isSelected('events', 'Rock') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Rock')}>Rock</button>
                    <button className={`rounded-button ${isSelected('events', 'Hard Rock') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Hard Rock')}>Hard Rock</button>
                    <button className={`rounded-button ${isSelected('events', 'Pop') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Pop')}>Pop</button>
                    <button className={`rounded-button ${isSelected('events', 'Dance/Electronic') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Dance/Electronic')}>Electronic</button>
                    <button className={`rounded-button ${isSelected('events', 'Indie Pop') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Indie Pop')}>Indie</button>
                    <button className={`rounded-button ${isSelected('events', 'Fairs & Festivals') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Fairs & Festivals')}>Festivals</button>
                    <button className={`rounded-button ${isSelected('events', 'Classical') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Classical')}>Classical</button>
                    <button className={`rounded-button ${isSelected('events', 'Jazz Blues') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Jazz Blues')}>Jazz</button>
                    <button className={`rounded-button ${isSelected('events', 'Hip-Hop/Rap') ? 'selected' : ''}`} onClick={() => handleSelect('events', 'Hip-Hop/Rap')}>Hip Hop/Rap</button>
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
                    <button className={`rounded-button ${isSelected('traits', 'Sports') ? 'selected' : ''}`} onClick={() => handleSelect('traits', 'Sports')}>Sports</button>
                    <button className={`rounded-button ${isSelected('traits', 'chill') ? 'selected' : ''}`} onClick={() => handleSelect('traits', 'chill')}>Quiet</button>
                    <button className={`rounded-button ${isSelected('traits', 'Culture') ? 'selected' : ''}`} onClick={() => handleSelect('traits', 'Culture')}>Cultural Sites</button>
                    <button className={`rounded-button ${isSelected('traits', 'Clubs') ? 'selected' : ''}`} onClick={() => handleSelect('traits', 'Clubs')}>Nightclubs</button>
                    <button className={`rounded-button ${isSelected('traits', 'Cheap') ? 'selected' : ''}`} onClick={() => handleSelect('traits', 'Cheap')}>Cheap</button>
                    <button className={`rounded-button ${isSelected('traits', 'Bars') ? 'selected' : ''}`} onClick={() => handleSelect('traits', 'Bars')}>Bars</button>
                    <button className={`rounded-button ${isSelected('traits', 'Travel') ? 'selected' : ''}`} onClick={() => handleSelect('traits', 'Travel')}>Travelling</button>
                    <button className={`rounded-button ${isSelected('traits', 'Event') ? 'selected' : ''}`} onClick={() => handleSelect('traits', 'Event')}>Live Events</button>
                </div>
                <button className='recc-submit' onClick={handleSubmit}>Submit</button>
            </div>
            <div className='city-recommendations'>
                <h1>City Recommendations</h1>
                {cityRecommendations.length > 0 ? (
                    <div>
                        <p>Based on your selection, here are the cities that best match your interest...</p>
                        <div className='city-recommendations-list'>
                            {cityRecommendations.map((city, index) => (
                                <CityData
                                    key={index}
                                    image={city.image}
                                    heading={city.heading}
                                    text={city.text}
                                    path={city.path}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Submit your preferences to get recommendations!</p>
                )}
            </div>
    
        </div>
    );
}

export default RecommenderContent;
