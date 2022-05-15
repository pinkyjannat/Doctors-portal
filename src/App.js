
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Pages/About/About';
import Appointment from './Pages/Appointment/Appointment';
import Home from './Pages/Home/Home';
import Login from './Pages/login/Login';
import NavBar from './Pages/shared/NavBar';

function App() {
  return (
    <div className="max-w-7xl mx-auto px-12">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="appointment" element={<Appointment></Appointment>} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
