import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import perugiaImg from "../assets/images/italy-horiz.jpg";
import PerugiaContent from '../components/PerugiaContent';

function Perugia (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={perugiaImg}
            title="Perugia, Italy"
            btnClass="hide"
            />
        <PerugiaContent/>
        <Footer/>
        </>
    )

}

export default Perugia;