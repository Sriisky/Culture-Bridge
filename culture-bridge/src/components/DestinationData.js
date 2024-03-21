// This component is used to display the highlighted cities

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Destinations.css";

class DestinationData extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <div className="des-text">
                    <Link to={this.props.link} className="des-header-link">
                        <h2>{this.props.heading}</h2>
                    </Link>
                    <p>{this.props.text}</p>
                </div>
                <div className="head-image">
                    <Link to={this.props.link} className="image-link">
                        <img alt="Destination 1" src={this.props.img1} className="styled-img" />
                    </Link>
                    <Link to={this.props.link} className="image-link">
                        <img alt="Destination 2" src={this.props.img2} className="styled-img" />
                    </Link>
                </div>
            </div>
        );
    }
}

export default DestinationData;
