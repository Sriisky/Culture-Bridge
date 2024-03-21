// This file contains the content for the highlighted cities seciton

import React from "react";
import "./Destinations.css";
import DestinationData from "./DestinationData";
import Zagreb1 from "../assets/images/zagreb-home1.jpg";
import Zagreb2 from "../assets/images/zagreb-home2.jpg";
import Zurich1 from "../assets/images/zurich-home1.jpg";
import Zurich2 from "../assets/images/zurich-home2.jpg";

const Destinations = () => {
    return (
        <div className="destination">
            <h1>Highlighted Cities</h1>
            <p>Explore Europe through Culture Bridge! This website is the starting point for your Erasmus experience. The following section is a small glimpse into some suggested Erasmus destinations. Dive into the vibrant culture of bustling cities across the EU and find your perfect exchange semester destination.</p>

            <DestinationData
                className="first-des"
                heading="Zagreb, Croatia"
                text="Known for its rich cultural heritage, vibrant arts scene, and welcoming atmosphere, Zagreb offers students a unique and enriching academic experience. Studying in Zagreb also offers students the opportunity to immerse themselves in a diverse and dynamic environment, with a blend of traditional European charm and modern amenities. Additionally, Zagreb's central location within Europe makes it a convenient hub for exploring other European destinations during breaks or weekends. Whether it's the historical architecture, bustling cafes, or the lush parks, Zagreb provides an inspiring backdrop for academic pursuits and personal growth."
                img1={Zagreb1}
                img2={Zagreb2}
                link="../Zagreb" 
            />

            <DestinationData
                className="first-des-reverse"
                heading="Zurich, Switzerland"
                text="Renowned for its high quality of life, picturesque landscapes, and robust economy, Zurich offers an exceptional environment for learning and growth. With a strong emphasis on innovation and technology, Zurich provides students with access to cutting-edge resources and opportunities for collaboration with industry leaders. Moreover, Zurich's cosmopolitan atmosphere and multicultural community offer a truly enriching experience, fostering cross-cultural understanding and global perspectives. Beyond academia, students can indulge in the city's vibrant arts scene, scenic beauty, and outdoor activities, making Zurich an ideal destination for both intellectual and personal development."
                img1={Zurich1}
                img2={Zurich2}
                link="../Zurich" 
            />
        </div>
    );
};

export default Destinations;
