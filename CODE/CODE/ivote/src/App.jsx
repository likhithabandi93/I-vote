import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Component/Home'
import RegisterForm from './Component/Home/RegisterForm';
import LoginForm from './Component/Home/LoginForm';
import AddParticipant from './Component/Admin/AddParticipant';
import ParticipantsView from './Component/Admin/ParticipantsView';
import AdminPanel from './Component/Admin/AdminPanel';
import VerifyOTP from './Component/Home/VerifyOTP';
import ViewParticipants from './Component/Home/ViewParticipants';
import LiveViewLeaderboard from './Component/Admin/LiveViewLeaderboard';
import { ToastContainer } from 'react-toastify';
import UserTable from './Component/Admin/UserTable';
import Dashboard from './Component/Admin/Dashboard';

import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/homepage" element={<ViewParticipants />} />

        <Route path='/admin' element={<AdminPanel />}>
          <Route path='add-participant' element={<AddParticipant />} />
          <Route path='edit-participant/:id' element={<AddParticipant />} />
          <Route path='view-participants' element={<ParticipantsView />} />
          <Route path='user-table' element={<UserTable />} />
          <Route path='live-view-leaderboard' element={<LiveViewLeaderboard />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Route>





      </Routes>
      <ToastContainer />
    </Router>
    </div>
  )
}

export default App
