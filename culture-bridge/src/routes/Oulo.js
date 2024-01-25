import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ouloImg from "../assets/images/finland-horizontal.jpg";
import OuloContent from '../components/OuloContent';

function Oulo (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={ouloImg}
            title="Oulo, Finland"
            btnClass="hide"
            />
        <OuloContent/>
        <Footer/>
        </>
    )

}

export default Oulo;