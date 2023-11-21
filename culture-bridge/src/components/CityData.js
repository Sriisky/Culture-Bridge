import './Cities.css';

function CityData(props){
    return(
        <div className='c-card'>
            <div className='c-image'>
                <img src={props.image} alt='city image'></img>
            </div>
            <h4>{props.heading}</h4>
            <p>{props.text}</p>
        </div>

    );
}

export default CityData;