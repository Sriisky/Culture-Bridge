import "./ZilinaContent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// University of Zilina courses url - https://www.uniza.sk/index.php/en/study/study-options/programmes-2024-2025
// University of Zilina events url - https://www.uniza.sk/index.php/en/

function ZilinaContent() {
    const [courses, setCourses] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [museums, setMuseums] = useState([]);
    const [concerts, setLiveEvents] = useState([]);
    const [reviews, setReviews] = useState([]);
    const coursesUrl = 'https://www.uniza.sk/index.php/en/study/study-options/programmes-2024-2025';
    const songkickUrl = 'https://www.songkick.com/metro-areas/32271-slovakia-zilina?utf8=%E2%9C%93&filters%5BminDate%5D=03%2F11%2F2024&filters%5BmaxDate%5D=12%2F31%2F2024';
    const countryCode = 'SK';
    const uniName = 'UNIZA';
    const searchCity = 'Slovak';
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
        <div className="zilina-container">
            <p>Welcome to Zilina! On this page you will find information on the University of Žilina
                which is the university you will be studying at if you choose to study in this city. Take a look at the courses on offer
                to see what is available at this university. The 'about' section will give you some information about UNIZA.
                You can also click on the headings below to get more information on the university.
            </p>
            <div className="section-wrapper">
                <div className="content-section">
                    <a href="https://www.uniza.sk/index.php/en/study/study-options/programmes-2024-2025" target="_blank" rel="noopener noreferrer"> 
                        <h1>Available Courses</h1>
                    </a>
                    <ul className="scrollable-list">
                        {courses.map((course, index) => (
                            <li key={index}>{course['Course Name']}</li> 
                        ))}
                    </ul>
                </div>
                <div className="content-section">
                    <a href="https://www.uniza.sk/index.php/en/" target="_blank" rel="noopener noreferrer">
                        <h1>Information on UNIZA</h1>
                    </a>
                    <ul className="scrollable-list">
                        At present there are about 8,000 students being educated at seven faculties in 172 
                        accredited fields of study in all forms and degrees of university studies at the 
                        University. In its over 70 years of successful existence it has become the alma mater for 
                        more than 88,000 graduates, highly skilled professionals specialising mostly in transport 
                        and technical fields as well as in management, marketing or humanities. The quality and 
                        readiness of our graduates for the needs of practice is proved by long-term high interest 
                        in hiring them 
                        by employers that cooperate with the University in the recruitment process.
                        In the field of science and research, our University participates in 200 national and 41 international scientific projects and 
                        organises about 60 scientific and professional events annually. There were two new 
                        significant work places established within the Operational Programme Research and 
                        Development in 2013 – University Science Park and Research Centre. Results of science and 
                        research activities of the University have an important influence not only on the 
                        educational activities but also on the development of international cooperation or 
                        interconnection with practice. One of the proofs of successful transfer of science and 
                        research results into practice is the Award for Technology Transfer for the team of 
                        authors from the Faculty of Mechanical Engineering at the University of Žilina.
                    </ul>
                </div>
            </div>
            <div className="content-section">
                <h1>Top 50 - Slovakia Playlist</h1>
                <p>The following tracks are trending in Slovakia today! If you click on any song you will be redirected to Spotify where you can listen to the song or add it to your playlist</p>
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
                <h1>Artworks from Zilina</h1>
                <p>Here are some artworks from Zilina:</p>
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
                <h1>Live Concerts across Zilina</h1>
                <p>Here are some events taking place across Zilina:</p>
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
                <h1>Reviews of Darmstadt From Other Students:</h1>
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

export default ZilinaContent;
