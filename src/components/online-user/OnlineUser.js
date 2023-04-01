import React from 'react';
import './OnlineUser.scss';

const OnlineUser = ({user}) => {
  return (
    <>
        <li className='display-flex align-items-center margin-bottom-15-px'>
            <div className='position-relative margin-right-10-px '>
            <img src={user?.profilePicture} className='width-40-height-40-px border-radius-50-percentage object-fit-cover' alt='profile' />
            <span className='online-icon width-14-height-14-px display-inline-block border-radius-50-percentage position-absolute'></span>
            </div>
            <span>{user?.name}</span>
        </li>
    </>
  )
}

export default OnlineUser