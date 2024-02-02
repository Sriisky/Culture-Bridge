import "./ZilinaContent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// University of Zilina courses url - https://www.uniza.sk/index.php/en/study/study-options/programmes-2024-2025
// University of Zilina events url - https://www.uniza.sk/index.php/en/

function ZilinaContent() {
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);
    const coursesUrl = 'https://www.uniza.sk/index.php/en/study/study-options/programmes-2024-2025';
    const eventsUrl = 'https://www.uniza.sk/index.php/en/';

    useEffect(() => {
        axios.get('http://localhost:8000/courses/', { params: { url: coursesUrl } })
            .then(response => setCourses(response.data.courses))  
            .catch(error => console.log(error));

        axios.get('http://localhost:8000/events/', { params: { url: eventsUrl } })
            .then(response => setEvents(response.data.events))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="zilina-container">
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

export default ZilinaContent;
