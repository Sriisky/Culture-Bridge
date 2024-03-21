// This file contains the code for the Cities component it displays the cities available for the Erasmus at TU Dublin 
// It uses the CityData component to display the individual city cards

import React, { useState } from "react";
import "./Cities.css";
import CityData from "./CityData";
import { cityInfos } from './CityDetails';

function Cities() {
    const [searchTerm, setSearchTerm] = useState("");
        
        const filteredCities = cityInfos.filter((city) =>
            city.heading.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const clearSearch = () => {
            setSearchTerm("");
        };
        
        return (
            <div className="city">
                <h1>Erasmus City Options</h1>
                <p>The following cities are available for the Erasmus study abroad programme at Technological University Dublin. Use the search bar 
                    to find cities or countries you are interested in. 
                </p>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search for cities or countries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    {searchTerm && (
                        <button onClick={clearSearch} className="clear-search">X</button>
                    )}
                </div>
                <div className="citycard">
                    {filteredCities.map((city, index) => (
                        <CityData
                            key={index}
                            image={city.image}
                            heading={city.heading}
                            text={city.text}
                            path={city.path}
                        />
                    ))}
                </div>
            </div>
        );
    }
    
    export default Cities;