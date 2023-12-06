import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './routes/Home';
import Discover from './routes/Discover'
import Benefits from './routes/Benefits'
import Recommend from './routes/Recommend'
import Darmstadt from './routes/Darmstadt'
import Cities from './components/Cities';
// All images have been sourced from pixabay

export default function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Discover" element={<Discover/>}/>
        <Route path="/Benefits" element={<Benefits/>}/>
        <Route path="/Recommend" element={<Recommend/>}/>
        <Route path="/Darmstadt" element={<Darmstadt/>}/>
        <Route path="/Cities" element={<Cities/>}/>
      </Routes>

    </div>
  );
}