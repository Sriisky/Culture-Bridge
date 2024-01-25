import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import zagrebImg from "../assets/images/croatia-horiz.jpg";
import ZagrebContent from '../components/ZagrebContent';

function Zagreb (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={zagrebImg}
            title="Zagreb, Croatia"
            btnClass="hide"
            />
        <ZagrebContent/>
        <Footer/>
        </>
    )

}

export default Zagreb;