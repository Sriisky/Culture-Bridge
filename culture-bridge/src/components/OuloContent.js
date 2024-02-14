import "./OuloContent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Oulo university of applied sciences course url - https://oamk.fi/en/study-at-oamk/bachelor-s-degrees/

function OuloContent() {
    const [courses, setCourses] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [museums, setMuseums] = useState([]);
    const [liveEvents, setLiveEvents] = useState([]);
    const coursesUrl = 'https://oamk.fi/en/study-at-oamk/bachelor-s-degrees/';
    const countryCode = 'FI';
    const searchCity = 'Northern Ostrobothnia Museum';

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
        <div className="oulo-container">
            <p>Welcome to Darmstadt! On this page you will find information on Hochschule Darmstadt
                which is the university you will be studying at if you choose to study in this city.Take a look at the courses on offer
                to see what is on offer at this university. The upcoming events will show you the events taking place at H-DA which may give you some insight
                into a studen's life at this university.
                The "Top 50 - Germany" playlist will give you insight into the music that is trending among Germans."
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
                    <h1>About OAMK</h1>
                    <ul className="scrollable-list">
                        <p>Oulu University of Applied Sciences educates successful 
                            experts and promotes well-being to the northern region.
                            We succeed because we are not afraid to try new things. 
                            We learn and challenge ourselves every day. At Oamk no one 
                            is left alone and we work together for our success. 
                            We believe in our dreams and make them a reality. 
                            We offer versatile, forward-thinking education and 
                            support the development of Oulu and Northern Finland with 
                            our research, development and innovation work. Our main 
                            campus, the Oulu Campus Linnanmaa, 
                            is the biggest campus in Europe operating under one roof</p>
                    </ul>
                </div>
            </div>
            <div className="content-section">
                <h1>Playlist</h1>
                <p>The following tracks are trending in Germany today! If you click on any song you will be redirected to Spotify where you can listen to the song or add it to your playlist</p>
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
                <h1>Artworks from Oulo</h1>
                <p>Here are some artworks from Oulo:</p>
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
                <h1>Live Music Events in Finland</h1>
                <p>Here are some events taking place across Finland:</p>
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

export default OuloContent;
