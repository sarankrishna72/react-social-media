import React from 'react';
import './Rightbar.scss';
import Divider from '../divider/Divider';
import OnlineUser from '../online-user/OnlineUser';
import { Users } from '../../dummyData';
import { useSelector } from 'react-redux';


const HomeRightbar = () => {
  const user = useSelector(state => state.user);

  return (
    <>
      <div className='rightbar-container'>
          <div className='birthday-container display-flex gap-10-px align-items-end'>
            <img src='/assets/images/gift.png' className='width-35-px' alt='birthday'/>
            <span className='font-weight-300'>
              <b>Devika </b> and <b>3 other friends</b> have a birthday today
            </span>
          </div>
          <Divider classes={'margin-bottom-15-px margin-top-15-px'}/>
          <div className='ad-container'>
            <div className='ad-item border-radius-10-px overflow-hidden'>
              <img src='/assets/images/ad.png' alt='advertisement' className='width-100-percentage'/>
            </div>
          </div>
          <Divider classes={'margin-bottom-15-px margin-top-15-px'}/>
          <h4 className='online-friends-title'>Online Friends</h4>
          <ul className='padding-0-px margin-0-px list-style-type-none'>
          {
            user.onlineusers.map((user) => {
              return <OnlineUser user={user} key={user.id}/>
            })
          }
            
          </ul>
      </div>
    </>
  )
}

const ProfileRightbar = () => {
  return (
    <>
      
      <h4 className='margin-bottom-20-px font-size-18-px font-weight-500 '>User Info</h4>
      <div className='info-container'>
        <div className='info-item margin-bottom-10-px'>
            <span className='info-key font-weight-500 font-size-14-px margin-right-15-px color-555555'> City:</span>
            <span className='info-value  font-weight-300 color-555555'> Newyork</span>
        </div>
        <div className='info-item margin-bottom-10-px'>
            <span className='info-key font-weight-500 font-size-14-px margin-right-15-px color-555555'> From:</span>
            <span className='info-value font-weight-300 color-555555'> India</span>
        </div>
        <div className='info-item margin-bottom-10-px'>
            <span className='info-key font-size-14-px font-weight-500 margin-right-15-px color-555555'> Relationship:</span>
            <span className='info-value font-weight-300 color-555555'> Married</span>
        </div>
      </div>

      <h4 className='margin-bottom-20-px'>User Friends</h4>
      <div className='user-friends-container display-flex flex-wrap-wrap gap-15-px justify-content-space-between'>
        <div className='friend-item display-flex flex-direction-column'>
          <img src='/assets/images/person/5.jpeg' className='width-100-height-100-px object-fit-cover margin-bottom-10-px border-radius-6-px' alt='profile' />
          <span className='font-weight-500 font-size-14-px'>Devika S</span>
        </div>
        <div className='friend-item display-flex flex-direction-column'>
          <img src='/assets/images/person/5.jpeg' className='width-100-height-100-px object-fit-cover margin-bottom-10-px border-radius-6-px' alt='profile' />
          <span className='font-weight-500 font-size-14-px'>Devika S</span>
        </div>
        <div className='friend-item display-flex flex-direction-column'>
          <img src='/assets/images/person/5.jpeg' className='width-100-height-100-px object-fit-cover margin-bottom-10-px border-radius-6-px' alt='profile' />
          <span className='font-weight-500 font-size-14-px'>Devika S</span>
        </div>
        <div className='friend-item display-flex flex-direction-column'>
          <img src='/assets/images/person/5.jpeg' className='width-100-height-100-px object-fit-cover margin-bottom-10-px border-radius-6-px' alt='profile' />
          <span className='font-weight-500 font-size-14-px'>Devika S</span>
        </div>
        <div className='friend-item display-flex flex-direction-column'>
          <img src='/assets/images/person/5.jpeg' className='width-100-height-100-px object-fit-cover margin-bottom-10-px border-radius-6-px' alt='profile' />
          <span className='font-weight-500 font-size-14-px'>Devika S</span>
        </div>
      </div>

    </>
  )
}

const Rightbar = ({profile}) => {
  return (
    <>
      {
        profile ?  <ProfileRightbar/> : <HomeRightbar/>

      }
    </>
  )
}

export default Rightbar