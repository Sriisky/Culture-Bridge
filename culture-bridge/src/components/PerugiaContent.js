// This file gathers all the data for Perugia and displays it on the Perugia page
// Contains a lot of the same code from CataloniaContent.js, where you can find more detailed comments

import "./PerugiaContent.css";
import MapComponent from './MapComponent';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Universita degli studi de perugia courses url - https://www.unipg.it/didattica/corsi-di-laurea-e-laurea-magistrale/area-tecnologica
// Universita degli studi de perugia events url - https://www.unipg.it/eventi?view=elenco

function PerugiaContent() {
    const [playlist, setPlaylist] = useState([]);
    const [museums, setMuseums] = useState([]);
    const [concerts, setLiveEvents] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [eventSearchTerm, setEventSearchTerm] = useState('');
    const songkickUrl = 'https://www.songkick.com/metro-areas/30351-italy-perugia?utf8=%E2%9C%93&filters%5BminDate%5D=03%2F11%2F2024&filters%5BmaxDate%5D=12%2F31%2F2024';
    const countryCode = 'IT';
    const uniName = 'UNIPG';
    const searchCity = 'Pietro Vanucci';
    const [userReview, setUserReview] = useState({
        timeSpent: '',
        description: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/get_reviews/', { params: { uniName: uniName } })
        .then(response => {
            setReviews(response.data.reviews);
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
        });

        fetchPlaylistInformation();
        handleSearch();
        fetchLiveConcerts();
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

    const fetchLiveConcerts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/concerts/', { params: { url: songkickUrl, countryCode: countryCode} });
            console.log('SongKicks response:', response.data);
            setLiveEvents(response.data.concerts);
        } catch (error) {
            console.error('Error fetching live events data: ', error);
        }
    };

    const handleChange = (e) => {
        setUserReview({...userReview, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewData = {
                review: {
                    timeSpent: userReview.timeSpent,
                    description: userReview.description
                },
                uniName: uniName
            };
            await axios.post('http://localhost:8000/api/save_reviews/', reviewData);
            setReviews([...reviews, reviewData.review]);
            setUserReview({ timeSpent: '', description: '' });
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleEventSearchChange = (e) => {
        setEventSearchTerm(e.target.value);
    };


    return (
        <div className="perugia-container">
            <p>Welcome to Perugia! On this page you will find information on Universita Degli Studi de Perugia 
                which is the university you will be studying at if you choose to study in this city. Take a look at the courses on offer
                to see what is available at this university. The upcoming events will show you the events taking place at UNIPG which may give you some insight
                into a student's life at this university. To get more information on the university, you can click on the headers below.
            </p>
            <div className="section-wrapper">
                <div className="content-section">
                    <a href="https://www.unipg.it/didattica/corsi-di-laurea-e-laurea-magistrale/area-tecnologica" target="_blank" rel="noopener noreferrer">
                        <h1>Available Courses</h1>
                    </a>
                    <ul className="scrollable-list">
                        <li>Design</li>
                        <li>Economia e cultura dell'alimentazione</li>
                        <li>Engineering management (corso in lingua inglese)</li>
                        <li>Ingegneria civile e ambientale</li>
                        <li>Ingegneria industriale (sede di Terni)</li>
                        <li>Ingegneria informatica ed elettronica</li>
                        <li>Ingegneria meccanica</li>
                        <li>Scienze agrarie e ambientali</li>
                        <li>Scienze e tecnologie agro-alimentari</li>
                        <li>Tecniche digitali per la gestione sostenibile delle costruzioni, dell’ambiente e del territorio</li>                 
                    </ul>
                </div>
                <div className="content-section">
                    <a href="https://www.unipg.it/eventi?view=elenco" target="_blank" rel="noopener noreferrer">
                        <h1>Upcoming Events</h1>
                    </a>
                    <ul className="scrollable-list">
                        <li>Far fronte alla violenza sulle donne: Proposte dei giovani per una regolamentazione su scala europea<br />Perugia, 23 aprile 2024 - ore 11</li>
                        <li>Far fronte alla violenza sulle donne: Proposte dei giovani per una regolamentazione su scala europea<br />Perugia, 22 aprile 2024 - ore 13</li>
                        <li>Novità in endocrinologia pediatrica<br />Perugia, 2 marzo 2024 - ore 8,30</li>
                        <li>MarzOrienta: DSA3, giornata di accoglienza e orientamento<br />Perugia, 1 marzo 2024 - ore 10</li>
                        <li>Scarti materiali e risorse sociali<br />Perugia, 29 febbraio 2024 - ore 9,30</li>
                        <li>Open day Medicina Veterinaria<br />Perugia, 23 Febbraio 2024 - ore 10</li>
                        <li>Terni Festival: Lectio Magistrale del Rettore<br />Terni, 23 febbraio 2024 - ore 17,30</li>
                        <li>I dialoghi di Scienze Politiche - Fog in the channel: continent isolated. Uno sguardo storico sulla Brexit<br />Perugia, 19 febbraio 2024 - ore 16,30</li>
                        <li>Ciclo di seminari dei dottorandi del Dipartimento di Scienze Agrarie, Alimentari ed Ambientali<br />Perugia, 19 febbraio 2024 - ore 15,30</li>
                        <li>Learn to fly - Financial literacy for youth<br />Perugia, 19 febbraio 2024 - ore 16</li>
                    </ul>
                </div>
            </div>
            <div className="content-section">
                <h1>Top 50 - Italy Playlist</h1>
                <p>The following tracks are trending in Italy today! If you click on any song you will be redirected to Spotify where you can listen to the song or add it to your playlist</p>
                <ul className="scrollable-list">
                    {playlist.map((song, index) => (
                        <li key={index} className="playlist-item">
                            <img src={song.thumbnail} alt="Thumbnail" className="playlist-thumbnail" />
                            <div className="playlist-details">
                                <strong>
                                    {song.spotify_url ? (
                                        <a href={song.spotify_url} target="_blank" rel="noopener noreferrer">{song.title}</a>
                                    ) : song.title}
                                </strong>
                                <br />
                                {song.artist}<br />
                                Length: {Math.floor(song.length / 60000)}:{(song.length % 60000 / 1000).toFixed(0)} minutes
                            </div>
                            {song.spotify_url && (
                                <a href={song.spotify_url} target="_blank" rel="noopener noreferrer" className="play-button">▶</a>
                            )}
                        </li> 
                    ))}
                </ul>
            </div>
            <div className="content-section">
                <h1>Map of Perugia</h1>
                <p>Explore Perugia through google maps! Clicking on a location allows you to explore it further on the Google Maps website.</p>
                <MapComponent 
                    id="perugiaMap" 
                    lat={43.1107} 
                    lng={12.3908} 
                    zoom={14} 
                    markerPosition={{ lat: 43.11658340471552, lng: 12.386876939538805 }} 
                    markerTitle="University of Perugia"/>
            </div>
            <div className="content-section">
                <h1>Artworks from Perugia</h1>
                <p>Here are some artworks from Perugia:</p>
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
                <h1>Live Concerts across Perugia</h1>
                <p>Here are some events taking place across Perugia:</p>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search for artists..."
                        value={eventSearchTerm}
                        onChange={handleEventSearchChange}
                        className="search-input"
                    />
                    {eventSearchTerm && (
                        <button
                            onClick={() => setEventSearchTerm('')}
                            className="clear-search"
                        >
                            X
                        </button>
                    )}
                </div>
                <ul className="museum_scrollable-list">
                    {concerts.filter(liveEvent => 
                        liveEvent.title.toLowerCase().includes(eventSearchTerm.toLowerCase())
                    ).map((liveEvent, index) => (
                        <li key={index} className="museum-item">
                            <div className="museum-details">
                                {liveEvent.event_url ? (
                                    <strong>
                                        <a href={`https://www.songkick.com/${liveEvent.event_url}`} target="_blank" rel="noopener noreferrer">
                                            {liveEvent.title}
                                        </a>
                                    </strong>
                                ) : (
                                    <strong>{liveEvent.title}</strong>
                                )}
                                <span>{liveEvent.date}</span>
                                <span>{liveEvent.location}</span>
                            </div>
                        </li> 
                    ))}
                </ul>
            </div>
            <div className="content-section">
                <h1>Reviews of Perugia From Other Students:</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="timeSpent"
                        placeholder="How long did you live here for?"
                        value={userReview.timeSpent}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        placeholder="How did you find living here?"
                        value={userReview.description}
                        onChange={handleChange}
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
                <ul class="reviews-list">
                    {reviews.map((review, index) => (
                        <li key={index}>
                            <strong>Length of Stay: </strong> {review.timeSpent}<br />
                            <strong>Review of city: </strong> {review.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PerugiaContent;
