
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Pages/About/About';
import Appointment from './Pages/Appointment/Appointment';
import Home from './Pages/Home/Home';
import Login from './Pages/login/Login';
import RequireAuth from './Pages/login/RequireAuth';
import SignUp from './Pages/login/SignUp';
import NavBar from './Pages/shared/NavBar';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import DashBoard from './Pages/DashBoard/DashBoard';
import MyAppoinment from './Pages/DashBoard/MyAppoinment';
import MyReview from './Pages/DashBoard/MyReview';
import History from './Pages/DashBoard/History';
import Users from './Pages/DashBoard/Users';
import RequireAdmin from './Pages/login/RequireAdmin';

function App() {
  return (
    <div className="max-w-7xl mx-auto px-12">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="appointment" element={
        <RequireAuth>
           <Appointment/>
        </RequireAuth>
       } />
        <Route path="dashboard" element={
        <RequireAuth>
           <DashBoard/>
        </RequireAuth>
       } >
         <Route index element ={<MyAppoinment></MyAppoinment>}></Route>
         <Route path ="review" element={<MyReview></MyReview>}></Route>
         <Route path ="history" element={<History></History>}></Route>
         <Route path ="users" element={<RequireAdmin><Users/>pm</RequireAdmin>}></Route>
       </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
