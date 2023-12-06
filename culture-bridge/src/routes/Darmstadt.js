import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import darmstadtImg from "../assets/images/darmstadt3.jpg";
import DarmstadtContent from '../components/DarmstadtContent';

function Darmstadt (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={darmstadtImg}
            title="Darmstadt, Germany"
            btnClass="hide"
            />
        <DarmstadtContent/>
        <Footer/>
        </>
    )

}

export default Darmstadt;