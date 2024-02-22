import "./ZagrebContent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Rochester Institute of Technology courses url - https://www.rit.edu/croatia/overview-programs
// Rochester Institute of Technology events url - https://www.rit.edu/croatia/events-0

function ZagrebContent() {
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [museums, setMuseums] = useState([]);
    const [concerts, setLiveEvents] = useState([]);
    const [reviews, setReviews] = useState([]);
    const coursesUrl = 'https://www.rit.edu/croatia/overview-programs';
    const eventsUrl = 'https://www.rit.edu/croatia/events-0';
    const songkickUrl = 'https://www.songkick.com/metro-areas/29037-croatia-zagreb?utf8=%E2%9C%93&filters%5BminDate%5D=04%2F11%2F2024&filters%5BmaxDate%5D=12%2F31%2F2024';
    const countryCode = 'HR';
    const uniName = 'RIT';
    const searchCity = 'Dubrovnik';
    const [userReview, setUserReview] = useState({
        timeSpent: '',
        description: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8000/courses/', { params: { url: coursesUrl, uniName: uniName }  })
            .then(response => setCourses(response.data.courses))  
            .catch(error => console.log(error));

        axios.get('http://localhost:8000/events/', { params: { url: eventsUrl, uniName: uniName } })
            .then(response => setEvents(response.data.events))
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
            const response = await axios.post('http://localhost:8000/api/save_reviews/', reviewData);
            setReviews([...reviews, reviewData.review]);
            setUserReview({ timeSpent: '', description: '' });
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="zagreb-container">
            <p>Welcome to Zagreb! On this page you will find information on Rochester Institute of Technology Croatia
                which is the university you will be studying at if you choose to study in this city.Take a look at the courses on offer
                to see what is available at this university. The upcoming events will show you the events taking place at RIT which will give you some insight
                into a student's life at this university.
            </p>
            <div className="section-wrapper">
                <div className="content-section">
                    <h1>Available Courses</h1>
                    <ul className="scrollable-list">
                        <p>
                        Global Business Management, BS <br></br>
                        Hospitality and Tourism Management, BS <br></br>
                        New Media Design, BFA <br></br>
                        Web and Mobile Computing/IT, BS <br></br>
                        Information Technology and Analytics, MS <br></br>
                        Organizational Leadership and Innovation, MS <br></br>
                        </p>
                    </ul>
                </div>
                <div className="content-section">
                    <h1>Upcoming Events</h1>
                    <ul className="scrollable-list">
                        {events.map((event, index) => (
                            <li key={index}>
                                <strong>{event.title}</strong><br />
                                {event.description}<br />
                                <em>{event.date}</em>
                            </li> 
                        ))}
                    </ul>
                </div>
            </div>
            <div className="content-section">
                <h1>Top 50 - Croatia Playlist</h1>
                <p>The following tracks are trending in Croatia today! If you click on any song you will be redirected to Spotify where you can listen to the song or add it to your playlist</p>
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
                <h1>Artworks from Zagreb</h1>
                <p>Here are some artworks from Zagreb</p>
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
                <h1>Live Concerts across Zagreb</h1>
                <p>Here are some events taking place across Zagreb</p>
                <ul className="museum_scrollable-list">
                    {concerts.map((liveEvent, index) => (
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
                <h1>Reviews of Zagreb From Other Students:</h1>
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

export default ZagrebContent;
