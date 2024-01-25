import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import zwolleImg from "../assets/images/xwolle-horizontal.jpg";
import ZwolleContent from '../components/ZwolleContent';

function Zwolle (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={zwolleImg}
            title="Zwolle, Netherlands"
            btnClass="hide"
            />
        <ZwolleContent/>
        <Footer/>
        </>
    )

}

export default Zwolle;