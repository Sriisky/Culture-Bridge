import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import cataloniaImg from "../assets/images/spain-horiz.jpg";
import CataloniaContent from '../components/CataloniaContent';

function Catalonia (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={cataloniaImg}
            title="Catalonia, Spain"
            btnClass="hide"
            />
        <CataloniaContent/>
        <Footer/>
        </>
    )

}

export default Catalonia;