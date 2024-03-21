// This file contains the content for the highlighted cities seciton

import React from "react";
import "./Destinations.css";
import DestinationData from "./DestinationData";
import Regensburg1 from "../assets/images/regensburgHome1.jpg";
import Regensburg2 from "../assets/images/regensburgHome2.jpg";
import Vasteras1 from "../assets/images/vasterasHome1.jpg";
import Vasteras2 from "../assets/images/vasterasHome2.jpg";

const Destinations = () => {
    return (
        <div className="destination">
            <h1>Highlighted Cities</h1>
            <p>Explore Europe through Culture Bridge! This website is the starting point for your Erasmus experience. The following section is a small glimpse into some suggested Erasmus destinations. Dive into the vibrant culture of bustling cities across the EU and find your perfect exchange semester destination.</p>

            <DestinationData
                className="first-des"
                heading="Regensburg, Germany"
                text="Regensburg is not just a monument to the past; it's a contemporary academic hub with a vibrant student life that's home to one of Germany’s youngest universities, infusing the ancient city with youthful energy. The presence of numerous global firms in the region also provides a plethora of internship opportunities, allowing for practical experience alongside academic learning. Regensburg's geographical position is a gateway to Central Europe, inviting students to venture into diverse landscapes and cultures over short journeys. The city's culinary scene is as enriching as its academia, with cozy beer gardens and historic breweries that tell tales of Bavaria’s rich brewing traditions."
                img1={Regensburg1}
                img2={Regensburg2}
                link="../Regensburg" 
            />

            <DestinationData
                className="first-des-reverse"
                heading="Västerås, Sweden"
                text="
                Nestled on the shores of Lake Mälaren in Sweden, Västerås offers a serene yet stimulating study environment. Known for its innovation and industry, the city is also rich in natural beauty, from waterfront vistas to green expanses like Djäkneberget Park. Västerås’s blend of modern technology centers and historical landmarks like the Västerås Cathedral provides a unique contrast that enriches the student experience. Compact and student-friendly, Västerås is a place where education and relaxation go hand in hand, making it an ideal locale for students seeking balance between rigorous academics and a peaceful lifestyle."
                img1={Vasteras1}
                img2={Vasteras2}
                link="../Vasteras" 
            />
        </div>
    );
};

export default Destinations;
