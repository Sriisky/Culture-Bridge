import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Home from './routes/Home';
import Discover from './routes/Discover'
import Benefits from './routes/Benefits'
import Recommend from './routes/Recommend'
import Darmstadt from './routes/Darmstadt'
import Zwolle from './routes/Zwolle'
import Oulo from './routes/Oulo'
import Regensburg from './routes/Regensburg'
import Vasteras from './routes/Vasteras'
import Zurich from './routes/Zurich'
import Grimstad from './routes/Grimstad'
import Kufstein from './routes/Kufstein'
import Zagreb from './routes/Zagreb'
import Ljubljana from './routes/Ljubljana'
import Zilina from './routes/Zilina'
import Perugia from './routes/Perugia'
import Catalonia from './routes/Catalonia'
import Cities from './components/Cities';
// All images have been sourced from pixabay and pexels

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Discover" element={<Discover/>}/>
        <Route path="/Benefits" element={<Benefits/>}/>
        <Route path="/Recommend" element={<Recommend/>}/>
        <Route path="/Darmstadt" element={<Darmstadt/>}/>
        <Route path="/Zwolle" element={<Zwolle/>}/>
        <Route path="/Oulo" element={<Oulo/>}/>
        <Route path="/Regensburg" element={<Regensburg/>}/>
        <Route path="/Vasteras" element={<Vasteras/>}/>
        <Route path="/Zurich" element={<Zurich/>}/>
        <Route path="/Grimstad" element={<Grimstad/>}/>
        <Route path="/Kufstein" element={<Kufstein/>}/>
        <Route path="/Zagreb" element={<Zagreb/>}/>
        <Route path="/Ljubljana" element={<Ljubljana/>}/>
        <Route path="/Zilina" element={<Zilina/>}/>
        <Route path="/Perugia" element={<Perugia/>}/>
        <Route path="/Catalonia" element={<Catalonia/>}/>
        <Route path="/Cities" element={<Cities/>}/>
      </Routes>

    </div>
  );
}