import React from 'react';
import './Leftbar.scss';
import Button from '../button/Button';
// import FriendSuggestionCard from '../friend-suggestion-card/FriendSuggestionCard';

const Leftbar = (props) => {
  return (
    <>
      <div className={`padding-20-px height-100-percentage overflow-y-auto custom-scrollbar-style ${props.classes}`}  style={{height: "calc(100vh - 50px)"} }>
        <ul className='padding-0-px margin-0-px list-style-type-none'>
          <li className='display-flex align-items-center margin-bottom-20-px gap-15-px'>
            <span className="material-symbols-outlined side-icon">rss_feed</span>
            <span className='sidebar-list-item-text'>Feed</span>
          </li>
          <li className='display-flex align-items-center margin-bottom-20-px gap-15-px'>
            <span className="material-icons side-icon">chat</span>
            <span className='sidebar-list-item-text'>Chats</span>
          </li>
          <li className='display-flex align-items-center margin-bottom-20-px gap-15-px'>
            <span className="material-icons side-icon">play_circle</span>
            {/* <PlayCircleFilledOutlined className='side-icon'/> */}
            <span className='sidebar-list-item-text'>Videos</span>
          </li>
          <li className='display-flex align-items-center margin-bottom-20-px gap-15-px'>
            <span className="material-icons side-icon">group</span>
            <span className='sidebar-list-item-text'>Groups</span>
          </li>
          <li className='display-flex align-items-center margin-bottom-20-px gap-15-px'>
            <span className="material-icons side-icon">bookmark</span>
            <span className='sidebar-list-item-text'>Bookmarks</span>
          </li>
          <li className='display-flex align-items-center margin-bottom-20-px gap-15-px'>
            <span className="material-icons side-icon">help</span>
            <span className='sidebar-list-item-text'>Questions</span>
          </li>
          <li className='display-flex align-items-center margin-bottom-20-px gap-15-px'>
            <span className="material-icons side-icon">work</span>
            <span className='sidebar-list-item-text'>Jobs</span>
          </li>
          <li className='display-flex align-items-center margin-bottom-20-px gap-15-px'>
            <span className="material-icons side-icon">event</span>
            <span className='sidebar-list-item-text'>Events</span>
          </li>
          <li className='display-flex align-items-center margin-bottom-20-px gap-15-px'>
            <span className="material-icons side-icon">school</span>
            <span className='sidebar-list-item-text'>Courses</span>
          </li>
        </ul>
        <Button  type="submit" btnType={'primary'} classes={'border-radius-5-px font-weight-500  min-width-150-px'} size={'medium'}>
          Show more
        </Button>
        <hr className='sidebar-hr margin-top-20-px margin-bottom-20-px' />
        <ul className='padding-0-px margin-0-px list-style-type-none'>
          {/* {
            user.onlineusers.map((user, i) => {
               return <FriendSuggestionCard user={user} key={user.id}/>
              }
            )
          } */}
         
        </ul>
      </div>
    </>
  )
}

export default Leftbar