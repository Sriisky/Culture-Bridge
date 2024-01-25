import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import kufsteinImg from "../assets/images/austria-horiz.jpg";
import KufsteinContent from '../components/KufsteinContent';

function Kufstein (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={kufsteinImg}
            title="Kufstein, Austria"
            btnClass="hide"
            />
        <KufsteinContent/>
        <Footer/>
        </>
    )

}

export default Kufstein;