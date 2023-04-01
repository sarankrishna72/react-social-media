import React, { useMemo, useContext } from 'react';
import './Topbar.scss';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedInUser } from '../../redux/userSlice';
import { getLoginDetails } from '../../core/auth/Auth';
import { SocketContext } from '../../context/socket';
import { useEffect } from 'react';


const Topbar = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const {socket } = useContext(SocketContext)
 
  useMemo(() => {
    if (Object.keys(user?.loggedInUser)?.length === 0) {
      dispatch(setLoggedInUser(getLoginDetails()));
    }   
  }, [user,dispatch]);


  useEffect(() => {
    let id =  getLoginDetails()._id;
    socket.emit("LOGGED_IN", id);
    socket.emit("CHECK_USER_FRIENDS", id)
  },[socket])


  return (
    <>
      <div className='topbar-container z-index-10 height-50-px width-100-percentage display-flex position-sticky top-0-px align-items-center'>
        <div className='topbar-left flex-3'>
          <Link to="/">
            <span className='logo font-size-24-px font-weight-bold margin-left-20-px color-ffffff cursor-pointer'>
              Socialbook
            </span>
          </Link>
            
        </div>
        <div className='topbar-center flex-5'>
          <div className='search-bar bg-ffffff width-100-percentage height-30-px border-radius-6-px display-flex align-items-center'>
            <i className="material-symbols-outlined margin-left-5-px search-icon color-65676b">search</i>
            <input type="text" placeholder="Search for friend, post or video " className="search-input border-width-0-px width-100-percentage" />
          </div>
        </div>
        <div className='topbar-right flex-4 display-flex align-items-center justify-content-space-around color-ffffff' >
          <div className='topbar-links'>
            <span className='topbar-link margin-right-10-px font-size-14-px cursor-pointer'>Homepage</span>
            <span className='topbar-link margin-right-10-px font-size-14-px cursor-pointer'>Timeline</span>
          </div>
          <div className='topbar-icons display-flex align-items-center'>
            <div className='topbar-icon-item margin-right-15-px cursor-pointer position-relative'>
              <i className="material-icons color-ffffff">person</i>
              <span className='topbar-icon-badge bg-ff0000 width-15-height-15-px font-size-12-px padding-1-px border-radius-50-percentage color-ffffff position-absolute display-flex align-items-center justify-content-center'>1</span>
            </div>
            <Link to={'/Chat'}>
              <div className='topbar-icon-item margin-right-15-px cursor-pointer position-relative'>
                <i className="material-icons color-ffffff">chat</i>
                <span className='topbar-icon-badge bg-ff0000 width-15-height-15-px font-size-12-px padding-1-px border-radius-50-percentage color-ffffff position-absolute display-flex align-items-center justify-content-center'>1</span>
              </div>
            </Link>
           
            <div className='topbar-icon-item margin-right-15-px cursor-pointer position-relative'>
              <i className="material-icons color-ffffff">notifications</i>
              <span className='topbar-icon-badge bg-ff0000 width-15-height-15-px font-size-12-px padding-1-px border-radius-50-percentage color-ffffff position-absolute display-flex align-items-center justify-content-center'>1</span>
            </div>
          </div>
          <img  src={user?.loggedInUser?.profilePicture} alt='profile' className='topbar-img width-32-height-32-px object-fit-cover border-radius-50-percentage cursor-pointer'/>
        </div>
      </div>
    </>
  )
}

export default Topbar;