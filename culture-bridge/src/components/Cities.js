import "./Cities.css"
import CityData from "./CityData";
import Darmstadt from "../assets/images/darmstadt.jpg"
import Zwolle from "../assets/images/zwolle.jpg"
import Oulo from "../assets/images/finland.jpg"

function Cities(){
    return(
        <div className="city">

        <h1>Erasmus City Options</h1>
            <p>The following cities include a sample of the cities and countries available for the Erasmus study abroad programme at
            Technological University Dublin.
            </p>
            <div className="citycard">
                <CityData 
                    image={Darmstadt}
                    heading = "Darmstadt, Germany"
                    text = "Darmstadt, known as the 'City of Science' in Germany, is a hub of innovation and progress nestled in the state of Hesse. 
                    It's home to a myriad of research institutions and universities, which stand alongside the remarkable art nouveau architecture 
                    that defines its unique aesthetic.Visitors can explore the Mathildenhöhe artists' colony with its iconic Wedding Tower."
                /> 

                <CityData 
                    image={Zwolle}
                    heading = "Zwolle, Netherlands"
                    text = "Zwolle boasts a rich history encapsulated within its well-preserved medieval city center.
                    Marvel at the grandeur of the Grote Kerk. Zwolle is also famous for its culinary delights, 
                    including the must-try bluefinger delicacies. With its picturesque canals and a calendar full of cultural festivals, 
                    Zwolle is a Dutch delight that seamlessly blends tradition with a lively contemporary spirit"
                /> 

                <CityData 
                    image={Oulo}
                    heading = "Oulo, Finland"
                    text = "Oulu offers a gateway to arctic experiences with its stunning landscapes and unique cultural heritage. 
                    Visitors can enjoy the serene beauty of the Oulujoki River, explore the vibrant market square, and experience the magic of the Northern Lights. 
                    With year-round activities from cycling along its extensive paths in summer to cross-country skiing in winter, Oulu is a dynamic city for all seasons."
                /> 

            </div>
        </div>
    );
}

export default Cities;