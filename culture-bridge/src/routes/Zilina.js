import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import zilinaImg from "../assets/images/slovakia-horiz.jpg";
import ZilinaContent from '../components/ZilinaContent';

function Zilina (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={zilinaImg}
            title="Zilina, Slovakia"
            btnClass="hide"
            />
        <ZilinaContent/>
        <Footer/>
        </>
    )

}

export default Zilina;