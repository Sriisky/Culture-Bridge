// This file contains the Benefits page of the website

import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import benefitImg from "../assets/images/concert2.jpg";
import ErasmusBenefits from '../components/ErasmusBenefits';

function Benefits (){
    return(
        <>
        <NavBar />
            <Hero
            cName="hero-benefits"
            heroImg={benefitImg}
            title="Erasmus Gains"
            btnClass="hide"
            />
        <ErasmusBenefits/>
        <Footer/>
        </>
    )

}

export default Benefits;