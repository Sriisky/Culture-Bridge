import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Cities from '../components/Cities';
import discoverImg from "../assets/images/amsterdam.jpg";

function Discover (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-discover"
            heroImg={discoverImg}
            title="Discover Cities"
            btnClass="hide"
            />

        <Cities/>

        <Footer/>
        </>
    )

}

export default Discover;