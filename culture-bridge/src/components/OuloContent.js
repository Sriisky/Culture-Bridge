import "./OuloContent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Oulo university of applied sciences course url - https://oamk.fi/en/study-at-oamk/bachelor-s-degrees/

function OuloContent() {
    const [courses, setCourses] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [museums, setMuseums] = useState([]);
    const [liveEvents, setLiveEvents] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [eventSearchTerm, setEventSearchTerm] = useState('');
    const coursesUrl = 'https://oamk.fi/en/study-at-oamk/bachelor-s-degrees/';
    const countryCode = 'FI';
    const uniName = 'OAMK';
    const searchCity = 'Northern Ostrobothnia Museum';
    const [userReview, setUserReview] = useState({
        timeSpent: '',
        description: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8000/courses/', { params: { url: coursesUrl, uniName: uniName }  })
            .then(response => setCourses(response.data.courses))  
            .catch(error => console.log(error));

        // Fetch reviews
        axios.get('http://localhost:8000/api/get_reviews/', { params: { uniName: uniName } })
        .then(response => {
            setReviews(response.data.reviews);
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
        });

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
            const response = await axios.post('http://localhost:8000/api/save_reviews/', reviewData);
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
        <div className="oulo-container">
            <p>Welcome to Oulo! On this page you will find information on Oulo University of Applied Sciences
                which is the university you will be studying at if you choose to study in this city. Take a look at the courses on offer
                to see what is on offer at this university. The 'about' section will provide some insight into what OAMK values which may help your decision making process
                for choosing where to study. You can also click on the headings below to get more information on the university.
            </p>
            <div className="section-wrapper">
                <div className="content-section">
                    <a href="https://oamk.fi/en/study-at-oamk/bachelor-s-degrees/" target="_blank" rel="noopener noreferrer">
                        <h1>Available Courses</h1>
                    </a>
                    <ul className="scrollable-list">
                        {courses.map((course, index) => (
                            <li key={index}>{course['Course Name']}</li> 
                        ))}
                    </ul>
                </div>
                <div className="content-section">
                    <a href="https://oamk.fi/en/" target="_blank" rel="noopener noreferrer">
                        <h1>About OAMK</h1>
                    </a>
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
                <h1>Top 50 - Finland Playlist</h1>
                <p>The following tracks are trending in Finland today! If you click on any song you will be redirected to Spotify where you can listen to the song or add it to your playlist</p>
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
                <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by Genre..."
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
                        {liveEvents.filter(event => 
                            event.genre.toLowerCase().includes(eventSearchTerm.toLowerCase()) || 
                            event.subgenre.toLowerCase().includes(eventSearchTerm.toLowerCase())
                        ).map((event, index) => (
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
            <div className="content-section">
                <h1>Reviews of Oulo From Other Students:</h1>
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

export default OuloContent;
