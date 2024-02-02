import "./LjubljanaContent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// University of Ljublana courses url - https://www.uni-lj.si/study/eng/subjects-bachelor/#University%20of%20Ljubljana%20BIOTECHNICAL%20FACULTY
// University of Ljublana events url - https://www.uni-lj.si/news/events_calendar/

function LjubljanaContent() {
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);
    const coursesUrl = 'https://www.uni-lj.si/study/eng/subjects-bachelor/#University%20of%20Ljubljana%20BIOTECHNICAL%20FACULTY';
    const eventsUrl = 'https://www.uni-lj.si/news/events_calendar/';

    useEffect(() => {
        axios.get('http://localhost:8000/courses/', { params: { url: coursesUrl } })
            .then(response => setCourses(response.data.courses))  
            .catch(error => console.log(error));

        axios.get('http://localhost:8000/events/', { params: { url: eventsUrl } })
            .then(response => setEvents(response.data.events))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="ljubljana-container">
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

export default LjubljanaContent;
