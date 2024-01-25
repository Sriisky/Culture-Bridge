import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import grimstadImg from "../assets/images/norway-horiz.jpg";
import GrimstadContent from '../components/GrimstadContent';

function Grimstad (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={grimstadImg}
            title="Grimstad, Norway"
            btnClass="hide"
            />
        <GrimstadContent/>
        <Footer/>
        </>
    )

}

export default Grimstad;