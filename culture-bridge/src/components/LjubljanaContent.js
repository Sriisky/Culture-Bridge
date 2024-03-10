import "./LjubljanaContent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// University of Ljublana courses url - https://www.uni-lj.si/study/eng/subjects-bachelor/#University%20of%20Ljubljana%20BIOTECHNICAL%20FACULTY
// University of Ljublana events url - https://www.uni-lj.si/news/events_calendar/

function LjubljanaContent() {
    const [playlist, setPlaylist] = useState([]);
    const [museums, setMuseums] = useState([]);
    const [concerts, setLiveEvents] = useState([]);
    const [reviews, setReviews] = useState([]);
    const songkickUrl = 'https://www.songkick.com/metro-areas/32259-slovenia-ljubljana?utf8=%E2%9C%93&filters%5BminDate%5D=03%2F11%2F2024&filters%5BmaxDate%5D=12%2F31%2F2024';
    const countryCode = 'SI';
    const uniName = 'UNILJ';
    const searchCity = 'Ljubljana';
    const [userReview, setUserReview] = useState({
        timeSpent: '',
        description: ''
    });

    useEffect(() => {
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
        <div className="ljubljana-container">
           <p>Welcome to Ljubljana! On this page you will find information on the University of Ljubljana
                which is the university you will be studying at if you choose to study in this city.Take a look at the courses on offer
                to see what is available at this university. The 'about' section will give you insight into life at UL.
            </p>
            <div className="section-wrapper">
                <div className="content-section">
                <a href="https://www.uni-lj.si/study/eng/subjects-bachelor/#University%20of%20Ljubljana%20BIOTECHNICAL%20FACULTY" target="_blank" rel="noopener noreferrer">
                    <h1>Available Courses</h1>
                </a>
                    <ul className="scrollable-list">
                        <p>
                        ACADEMY OF FINE ARTS AND DESIGN <br></br>
                        ACADEMY OF MUSIC <br></br>
                        BIOTECHNICAL FACULTY <br></br>
                        FACULTY OF PUBLIC ADMINISTRATION <br></br>
                        FACULTY OF ARHITECTURE <br></br>
                        FACULTY OF ARTS <br></br>
                        FACULTY OF CIVIL AND GEODETIC ENGINEERING <br></br>
                        FACULTY OF COMPUTER AND INFORMATION SCIENCE <br></br>
                        SCHOOL OF ECONOMICS AND BUSINESS <br></br>
                        FACULTY OF EDUCATION <br></br>
                        FACULTY OF HEALTH SCIENCES <br></br>
                        FACULTY OF LAW <br></br>
                        FACULTY OF MARITIME STUDIES AND TRANSPORT <br></br> 
                        FACULTY OF MEDICINE <br></br>
                        FACULTY OF NATURAL SCIENCES AND ENGINEERING <br></br>
                        FACULTY OF PHARMACY <br></br>
                        FACULTY OF SOCIAL SCIENCES <br></br>
                        FACULTY OF SOCIAL WORK <br></br>
                        FACULTY OF SPORT <br></br>
                        FACULTY OF THEOLOGY <br></br>
                        </p>
                    </ul>
                </div>
                <div className="content-section">
                    <a href="https://www.uni-lj.si/news/events_calendar/" target="_blank" rel="noopener noreferrer">
                        <h1>Information on UNILJ</h1>
                    </a>
                    <ul className="scrollable-list">
                        <p>
                        University of Ljubljana is the oldest and largest higher 
                        education and scientific research institution in Slovenia. 
                        University with its rich tradition was founded in 1919. 
                        It has approximately 40,000 undergraduate and 
                        postgraduate students and employs approximately 6,000 higher
                         education teachers, researchers, assistants and 
                         administrative staff in 23 faculties and three arts 
                         academies. The central building, all three academies and 
                         faculties are located in the centre. Some of the most recent 
                         and modern buildings were constructed on the outskirts of 
                         Ljubljana, giving the university and its students a 
                         ubiquitous presence in the city. 
                        The University of Ljubljana is renowned for its quality 
                        social and natural sciences and technical study 
                        programmes, structured in accordance with the Bologna 
                        Declaration. Our projects keep pace with the latest 
                        developments in the areas of arts, sciences and technology at home and abroad. 
                        </p>
                    </ul>
                </div>
            </div>
            <div className="content-section">
                <h1>Top 50 - Slovenia Playlist</h1>
                <p>The following tracks are trending in Slovenia today! If you click on any song you will be redirected to Spotify where you can listen to the song or add it to your playlist</p>
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
                <h1>Artworks from Ljubljana</h1>
                <p>Here are some artworks from Ljublana:</p>
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
                <h1>Live Concerts across Slovenia</h1>
                <p>Here are some events taking place across Slovenia:</p>
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
                <h1>Reviews of Ljublana From Other Students:</h1>
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

export default LjubljanaContent;
