import "./PerugiaContent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Universita degli studi de perugia courses url - https://www.unipg.it/didattica/corsi-di-laurea-e-laurea-magistrale/area-tecnologica
// Universita degli studi de perugia events url - https://www.unipg.it/eventi?view=elenco

function PerugiaContent() {
    const [playlist, setPlaylist] = useState([]);
    const [museums, setMuseums] = useState([]);
    const [concerts, setLiveEvents] = useState([]);
    const coursesUrl = 'https://www.unipg.it/didattica/corsi-di-laurea-e-laurea-magistrale/area-tecnologica';
    const eventsUrl = 'https://www.unipg.it/eventi?view=elenco';
    const songkickUrl = 'https://www.songkick.com/metro-areas/30351-italy-perugia?utf8=%E2%9C%93&filters%5BminDate%5D=03%2F11%2F2024&filters%5BmaxDate%5D=12%2F31%2F2024';
    const countryCode = 'IT';
    const uniName = 'UNIPG';
    const searchCity = 'Pietro Vanucci';

    useEffect(() => {
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
            const response = await axios.get('http://localhost:8000/concerts/', { params: { url: songkickUrl} });
            console.log('SongKicks response:', response.data);
            setLiveEvents(response.data.concerts);
        } catch (error) {
            console.error('Error fetching live events data: ', error);
        }
    };


    return (
        <div className="perugia-container">
            <p>Welcome to Perugia! On this page you will find information on Universita Degli Studi de Perugia 
                which is the university you will be studying at if you choose to study in this city.Take a look at the courses on offer
                to see what is available at this university. The upcoming events will show you the events taking place at UNIPG which may give you some insight
                into a student's life at this university.
            </p>
            <div className="section-wrapper">
                <div className="content-section">
                    <h1>Available Courses</h1>
                    <ul className="scrollable-list">
                        <p>Design
                        Economia e cultura dell'alimentazione
                        Engineering management (corso in lingua inglese)
                        Ingegneria civile e ambientale
                        Ingegneria industriale (sede di Terni)
                        Ingegneria informatica ed elettronica
                        Ingegneria meccanica
                        Scienze agrarie e ambientali
                        Scienze e tecnologie agro-alimentari
                        Tecniche digitali per la gestione sostenibile delle costruzioni, dell’ambiente e del territorio
                        </p>                  
                    </ul>
                </div>
                <div className="content-section">
                    <h1>Upcoming Events</h1>
                    <ul className="scrollable-list">
                        <p>
                        {">"}Far fronte alla violenza sulle donne: Proposte dei giovani per una regolamentazione su scala europea
                        Perugia, 23 aprile 2024 - ore 11
                        {">"}Far fronte alla violenza sulle donne: Proposte dei giovani per una regolamentazione su scala europea
                        Perugia, 22 aprile 2024 - ore 13
                        {">"}Novità in endocrinologia pediatrica
                        Perugia, 2 marzo 2024 - ore 8,30
                        {">"}MarzOrienta: DSA3, giornata di accoglienza e orientamento
                        Perugia, 1 marzo 2024 - ore 10
                        {">"}Scarti materiali e risorse sociali
                        Perugia, 29 febbraio 2024 - ore 9,30
                        {">"}Open day Medicina Veterianria
                        Perugia, 23 Febbraio 2024 ore 10
                        {">"}Terni Festival: Lectio Magistrale del Rettore
                        Terni, 23 febbraio 2024 - ore 17,30
                        {">"}I dialoghi di Scienze Politiche - Fog in the channel: continent isolated. Uno sguardo storico sulla Brexit
                        Perugia, 19 febbraio 2024 - ore 16,30
                        {">"}Ciclo di seminari dei dottorandi del Dipartimento di Scienze Agrarie, Alimentari ed Ambientali
                        Perugia, 19 febbraio 2024 - ore 15,30
                        {">"}Learn to fly - Financial literacy for youth
                        Perugia, 19 febbraio 2024 - ore 16
                        </p>
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
        </div>
    );
}

export default PerugiaContent;
