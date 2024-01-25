import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ljubljana from "../assets/images/slovenia-horiz.jpg";
import LjubljanaContent from '../components/LjubljanaContent';

function Ljubljana (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={ljubljana}
            title="Ljubljana, Slovenia"
            btnClass="hide"
            />
        <LjubljanaContent/>
        <Footer/>
        </>
    )

}

export default Ljubljana;