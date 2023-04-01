
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { Home } from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import PrivateRoutes from './core/router-guard/PrivateRoutes';
import MainLayout from './components/layout/MainLayout';
import { isLoggedIn } from './core/auth/Auth';
import { useSelector, useDispatch } from 'react-redux';

import ToastContainer from './components/toast/ToastContainer';
import Chat from './pages/chat/Chat';

// import { socket, SocketContext } from './context/socket';
import { useEffect, useContext } from 'react';
import { setOnlineusers } from './redux/userSlice';
import { SocketContext } from './context/socket';
import VideoAudioCall from './components/video-audio-call/VideoAudioCall';
import IncomingCallPopup from './components/incoming-call-popup/IncomingCallPopup';

function App() {
  const user = useSelector(state => state.user);
  const {socket, isCalled, callAccepted } = useContext(SocketContext)
  const dispatch = useDispatch();
  useEffect(() => { 

    socket.on("LOGOUT_FRIEND_USER", (data) => {
      let u = user.onlineusers.filter(x => x._id !== data);
      dispatch(setOnlineusers(u))
    })

    socket.on("RECIEVE_SIGNED_FRIEND_USER", (data) => {
      let u = user.onlineusers.filter(x => x._id !== data._id)
      u = [...u, ...[data]]
      dispatch(setOnlineusers(u))
    });

    socket.on("GET_USER_FRIENDS",  (data) => {
      dispatch(setOnlineusers(data))
    })

  }, [socket])
  
  return (
    <>
    {
      (isCalled || callAccepted) && 
      <VideoAudioCall/>
    }
   
      <>
        <IncomingCallPopup/>
      </>
      <Router>
        <Routes>
          <Route exact path="/" element={<PrivateRoutes/>}>
            <Route path='/' exact element={<MainLayout/>}>
              <Route index  element={<Home/>}></Route>
              <Route path="/Home" element={<Home />}></Route>
              <Route path="/Chat" element={<Chat />}></Route>
              <Route path="/Profile/:username" element={<Profile />}></Route>
            </Route>
          </Route>
          <Route path="/Login" element={ isLoggedIn() ? <Navigate to="/" /> : <Login />}></Route>
          <Route path="/Register" element={ isLoggedIn() ? <Navigate to="/" /> : <Register />}></Route>
        </Routes>
      </Router>
      <ToastContainer/>
          
      {/* </SocketContext.Provider> */}
    </>
  );
}

export default App;
