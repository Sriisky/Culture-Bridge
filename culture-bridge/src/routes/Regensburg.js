import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import regensburgImg from "../assets/images/regensburg-landscape.jpg";
import RegensburgContent from '../components/RegensburgContent';

function Regensburg (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={regensburgImg}
            title="Regensburg, Germany"
            btnClass="hide"
            />
        <RegensburgContent/>
        <Footer/>
        </>
    )

}

export default Regensburg;