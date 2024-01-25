import "./VasterasContent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VasterasContent() {
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/courses/')
            .then(response => setCourses(response.data.courses))  
            .catch(error => console.log(error));

        axios.get('http://localhost:8000/events/')
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
