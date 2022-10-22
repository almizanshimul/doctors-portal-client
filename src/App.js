import './App.css';
import Navbar from './Pages/Shared/Navbar';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Appointment from './Pages/Appointment/Appointment';
import Reviews from './Pages/Reviews/Reviews';
import ContactUs from './Pages/ContactUs/ContactUs';
import Login from './Pages/Login/Login';
// import { ToastContainer } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
// import 'react-toastify/dist/ReactToastify.css';
import SignUp from './Pages/Login/SignUp';
import RequireAuth from './Pages/Login/RequireAuth';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyAppointments from './Pages/Dashboard/MyAppointments';
import MyReview from './Pages/Dashboard/MyReview';
import MyHistory from './Pages/Dashboard/MyHistory';
import AllUser from './Pages/Dashboard/AllUser';
import RequireAdmin from './Pages/Login/RequireAdmin';
import AddDoctor from './Pages/Dashboard/AddDoctor';
import ManageDoctors from './Pages/Dashboard/ManageDoctors';
import Payment from './Pages/Dashboard/Payment';




function App() {
  return (
    <div className='container mx-auto'>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/appointment" element={
          <RequireAuth>
            <Appointment />
          </RequireAuth>} />
        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>} >
        <Route path="/dashboard/payment/:id" element={
          <RequireAuth>
            <Payment />
          </RequireAuth>} />
          <Route index element={<MyAppointments />} />
          <Route path="my-review" element={<MyReview />} />
          <Route path="history" element={<MyHistory />} />
          <Route path="users" element={<RequireAdmin><AllUser /></RequireAdmin>} />
          <Route path="doctor" element={<RequireAdmin><AddDoctor /></RequireAdmin>} />
          <Route path="manage-doctors" element={<RequireAdmin><ManageDoctors /></RequireAdmin>} />
        </Route>
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {/* <ToastContainer /> */}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
