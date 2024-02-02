import "./VasterasContent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Uni of Malardalen courses url - https://www.mdu.se/utbildning/sok-utbildning?query=&page=0&educationType=courses
// Uni of Malardalen events url - https://www.mdu.se/kalender

function VasterasContent() {
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);
    const coursesUrl = 'https://www.mdu.se/utbildning/sok-utbildning?query=&page=0&educationType=courses';
    const eventsUrl = 'https://www.mdu.se/kalender';

    useEffect(() => {
        axios.get('http://localhost:8000/courses/', { params: { url: coursesUrl } })
            .then(response => setCourses(response.data.courses))  
            .catch(error => console.log(error));

        axios.get('http://localhost:8000/events/', { params: { url: eventsUrl } })
            .then(response => setEvents(response.data.events))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="vasteras-container">
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

export default VasterasContent;
