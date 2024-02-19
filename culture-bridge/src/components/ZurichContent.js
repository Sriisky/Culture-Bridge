import "./ZurichContent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Uni of App sciences and arts Northwestern courses url - https://www.fhnw.ch/en/degree-programmes/undergraduate-programmes

function ZurichContent() {
    const [courses, setCourses] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [museums, setMuseums] = useState([]);
    const [liveEvents, setLiveEvents] = useState([]);
    const coursesUrl = 'https://www.fhnw.ch/en/degree-programmes/undergraduate-programmes';
    const countryCode = 'CH';
    const searchCity = 'Zurich';

    useEffect(() => {
        axios.get('http://localhost:8000/courses/', { params: { url: coursesUrl } })
            .then(response => setCourses(response.data.courses))  
            .catch(error => console.log(error));

        fetchPlaylistInformation();
        handleSearch();
        fetchLiveEvents();
    }, []);

    const fetchPlaylistInformation = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/authenticate/', { params: { countryCode: countryCode }});
            console.log('Playlist response:', response.data); // Log the response for debugging
            setPlaylist(response.data.playlist);
        } catch (error) {
            console.error('Error fetching playlist data: ', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/search_europeana/', { params: { cityName: searchCity }});
            console.log('Museums response:', response.data);
            setMuseums(response.data.museums);
        } catch (error) {
            console.error('Error fetching artworks data: ', error);
        }
    };

    const fetchLiveEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/get_live_events/', { params: { countryCode: countryCode }});
            console.log('Ticketmasters response:', response.data);
            setLiveEvents(response.data.liveEvents);
        } catch (error) {
            console.error('Error fetching live events data: ', error);
        }
    };

    return (
        <div className="zurich-container">
            <p>Welcome to Zurich! On this page you will find information on University of Applied Sciences and Arts Northwestern Switzerland
                which is the university you will be studying at if you choose to study in this city.Take a look at the courses on offer
                to see what is available at this university. The 'about' section gives you a description of FHNW which may give you some insight into what the university is like.
            </p>
            <div className="section-wrapper">
                <div className="content-section">
                    <h1>Available Courses</h1>
                    <ul className="scrollable-list">
                        {courses.map((course, index) => (
                            <li key={index}>{course['Course Name']}</li> 
                        ))}
                    </ul>
                </div>
                <div className="content-section">
                    <h1>About FHNW</h1>
                    <ul className="scrollable-list">
                        <p>FHNW is one of Switzerland’s leading universities of applied sciences and arts, 
                            actively involved in teaching, research, continuing education and service provision – 
                            both innovative and practice-oriented. Its broad range of degree programmes, 
                            hands-on concept, innovative, application-oriented research and global network 
                            make FHNW a diversified and appealing educational institution, a sought-after 
                            partner to industry and an attractive employer in northwestern Switzerland.
                        </p>
                    </ul>
                </div>
            </div>
            <div className="content-section">
                <h1>Top 50 - SwitzerlandPlaylist</h1>
                <p>The following tracks are trending in Switzerland today! If you click on any song you will be redirected to Spotify where you can listen to the song or add it to your playlist</p>
                <ul className="scrollable-list">
                    {playlist.map((song, index) => (
                        <li key={index} className="playlist-item">
                            <img src={song.thumbnail} alt="Thumbnail" className="playlist-thumbnail" />
                            <div className="playlist-details">
                                {song.spotify_url ? (
                                    <strong><a href={song.spotify_url} target="_blank" rel="noopener noreferrer">{song.title}</a></strong>
                                ) : (
                                    <strong>{song.title}</strong>
                                )}
                                <br />
                                {song.artist}<br />
                                Length: {Math.floor(song.length / 60000)}:{(song.length % 60000 / 1000).toFixed(0)} minutes
                            </div>
                        </li> 
                    ))}
                </ul>
            </div>
            <div className="content-section">
                <h1>Artworks from Zurich</h1>
                <p>Here are some artworks from Zurich:</p>
                <ul className="museum_scrollable-list">
                    {museums.map((art, index) => (
                        <li key={index} className="museum-item">
                            <img src={art.thumbnail} alt="Thumbnail" className="museum-thumbnail" />
                            <div className="museum-details">
                                <strong>{art.title}</strong>
                                <span>{art.location}</span>
                            </div>
                        </li> 
                    ))}
                </ul>
            </div>
            <div className="content-section">
                <h1>Live Music Events in Switzerland</h1>
                <p>Here are some events taking place across Switzerland.</p>
                <ul className="museum_scrollable-list">
                    {liveEvents.map((event, index) => (
                        <li key={index} className="museum-item">
                            <img src={event.image_url} alt="Thumbnail" className="museum-thumbnail" />
                            <div className="museum-details">
                            {event.url ? (
                                    <strong><a href={event.url} target="_blank" rel="noopener noreferrer">{event.name}</a></strong>
                                ) : (
                                    <strong>{event.name}</strong>
                                )}
                                <span>{event.date}</span>
                                <span>{event.genre}</span>
                                <span>{event.subgenre}</span>
                            </div>
                        </li> 
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ZurichContent;
