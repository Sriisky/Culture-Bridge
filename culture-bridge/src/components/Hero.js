// This component is used as the first thing you see on each page. It contains the main image and title of the page

import "./Hero.css";

function Hero (props){
    return(
        <>
        <div className={props.cName}>
            <img src={props.heroImg} alt="students"/>

            <div className="hero-text">
                <h1>{props.title}</h1>
                <p>
                    {props.text}
                </p>
                <a href={props.url} className={props.btnClass}>{props.btnText}</a>

            </div>

        </div>
        </>
    );
}
export default Hero;