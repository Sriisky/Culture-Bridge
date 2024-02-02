import "./OuloContent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Oulo university of applied sciences course url - https://oamk.fi/en/study-at-oamk/bachelor-s-degrees/
// Oulo university of applied sciences events url - https://oamk.fi/en/about-oamk/

function OuloContent() {
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);
    const coursesUrl = 'https://oamk.fi/en/study-at-oamk/bachelor-s-degrees/';
    const eventsUrl = 'https://oamk.fi/en/about-oamk/';

    useEffect(() => {
        axios.get('http://localhost:8000/courses/', { params: { url: coursesUrl } })
            .then(response => setCourses(response.data.courses))  
            .catch(error => console.log(error));

        axios.get('http://localhost:8000/events/', { params: { url: eventsUrl } })
            .then(response => setEvents(response.data.events))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="oulo-container">
            <h1>Available Courses</h1>
            <ul>
                {courses.map((course, index) => (
                    <li key={index}>{course['Course Name']}</li> 
                ))}
            </ul>
            <h1>Upcoming Events</h1>
            <ul>
                {events.map((event, index) => (
                    <li key={index}>
                        <strong>{event.title}</strong><br />
                        {event.description}<br />
                        <em>{event.date}</em>
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default OuloContent;
