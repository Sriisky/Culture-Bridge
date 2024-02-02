import "./ZwolleContent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Windesheim University of App Sciences courses - https://www.windesheim.com/study-programmes/exchange-programmes
// Windesheim University of App Sciences news - https://www.windesheim.com/news

function ZwolleContent() {
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);
    const coursesUrl = 'https://www.windesheim.com/study-programmes/exchange-programmes';
    const eventsUrl = 'https://www.windesheim.com/news';

    useEffect(() => {
        axios.get('http://localhost:8000/courses/', { params: { url: coursesUrl } })
            .then(response => setCourses(response.data.courses))  
            .catch(error => console.log(error));

        axios.get('http://localhost:8000/events/', { params: { url: eventsUrl } })
            .then(response => setEvents(response.data.events))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="zwolle-container">
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

export default ZwolleContent;
