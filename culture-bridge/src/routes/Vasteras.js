import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import vasterasImg from "../assets/images/sweden-landscape.jpg";
import VasterasContent from '../components/VasterasContent';

function Vasteras (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={vasterasImg}
            title="Vasteras, Sweden"
            btnClass="hide"
            />
        <VasterasContent/>
        <Footer/>
        </>
    )

}

export default Vasteras;