import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import recommImg from "../assets/images/students.jpg";
import RecommenderContent from '../components/RecommenderContent';

function Recommend (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={recommImg}
            title="Recommendations Specific to You"
            btnClass="hide"
            />
        <RecommenderContent/>
        <Footer/>
        </>
    )

}

export default Recommend;