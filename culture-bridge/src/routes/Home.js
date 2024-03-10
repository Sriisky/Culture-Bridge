import NavBar from '../components/NavBar';
import Hero from '../components/Hero'
import Destinations from '../components/Destinations';
import Cities from '../components/Cities'
import Footer from '../components/Footer';

function Home (){
    return(
        <>
            <NavBar />
            <Hero
            cName="hero"
            heroImg="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Discover New Worlds"
            text="Find your Erasmus destination..."
            btnText="Discover Cities"
            url="/Discover"
            btnClass="show"
            />

            <Destinations/>
            <Cities/>
            <Footer/>
        
        </>
    );

}

export default Home;