import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import zurichImg from "../assets/images/switzerland-horizontal.jpg";
import ZurichContent from '../components/ZurichContent';

function Zurich (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={zurichImg}
            title="Zurich, Switzerland"
            btnClass="hide"
            />
        <ZurichContent/>
        <Footer/>
        </>
    )

}

export default Zurich;