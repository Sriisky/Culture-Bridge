// Footer component displayed on each page

import "./Footer.css"

const Footer = () =>{
    return(
        <div className="footer">
        <div className="top">
            <div>
                <h1>Culture Bridge</h1>
                <p>Enhance your Erasmus experience</p>
            </div>
            <div>
                <a href="https://www.linkedin.com/in/sara-egan" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                </a>
                <p>Sara Egan 2023</p>
            </div>
        </div>
        </div>
    );
}

export default Footer;