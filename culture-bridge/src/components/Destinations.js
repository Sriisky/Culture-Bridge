import DestinationData from "./DestinationData";
import "./Destinations.css"
import BarcelonaCathedral from "../assets/images/barcelonaCathedral.jpg"
import BarcelonaCity from "../assets/images/barcelonaCity.jpg"
import LisbonCity from "../assets/images/lisbonCity.jpg"
import LisbonCoast from "../assets/images/lisbonCoast.jpg"

const Destinations = () =>{
    return(
        <div className="destination">
            <h1>Popular Cities</h1>
            <p>Explore Europe through Culture Bridge! This website is the starting point for your Erasmus experience.
                The following section showcases the most popular Erasmus destinations. Dive into the vibrant culture of bustling cities 
                across the EU and find your perfect exchange semester destination.</p>

            <DestinationData className="first-des"
                heading="Barcelona, Spain"
                text="Barcelona is number one among most of European students for the Erasmus Exchange program. The city is lively and youthful with 
                plenty of avtivities to keep you busy. Barcelona is an incredible city that marks all students and travelers who 
                have the opportunity to stay there.
                From the sun-drenched beaches to the rich Catalan cuisine, Barcelona is a Mediterranean paradise that pulses with culture, art, and festivity."
                img1={BarcelonaCity}
                img2={BarcelonaCathedral}
            />

            <DestinationData className="first-des-reverse"
                heading="Lisbon, Portugal"
                text="Lisbon is a treasure trove of cultural history and contemporary charm. From the historic towers of 
                Belém to the picturesque streets of Alfama, the city offers a blend of traditional architecture and modern living. 
                Marvel at the stunning views from São Jorge Castle, indulge in the rich maritime heritage, and savor the unique flavor of Pastéis de Belém. 
                Lisbon's warm locals, vibrant nightlife, and scenic vistas make it an irresistible European gem"
                img1={LisbonCity}
                img2={LisbonCoast}
            />

        </div>
    );
};

export default Destinations;