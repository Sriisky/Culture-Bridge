// This component is used to display the city data in the form of cards in the cities page

import './Cities.css';
import { Link } from 'react-router-dom';


function CityData(props){
    return(
        <Link to={props.path} style={{textDecoration:"none"}}>
        <div className='c-card'>
            <div className='c-image'>
                <img src={props.image} alt='city image'></img>
            </div>
            <h4>{props.heading}</h4>
            <p>{props.text}</p>
        </div>
        </Link>
    );
}

export default CityData;