import "./OuloContent.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Oulo university of applied sciences course url - https://oamk.fi/en/study-at-oamk/bachelor-s-degrees/

function OuloContent() {
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);
    const coursesUrl = 'https://oamk.fi/en/study-at-oamk/bachelor-s-degrees/';

    useEffect(() => {
        axios.get('http://localhost:8000/courses/', { params: { url: coursesUrl } })
            .then(response => setCourses(response.data.courses))  
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
        </div>
    );
}

export default OuloContent;
