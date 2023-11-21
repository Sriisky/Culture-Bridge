import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './routes/Home';
import Discover from './routes/Discover'
import Benefits from './routes/Benefits'

export default function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Discover" element={<Discover/>}/>
        <Route path="/Benefits" element={<Benefits/>}/>
      </Routes>

    </div>
  );
}
