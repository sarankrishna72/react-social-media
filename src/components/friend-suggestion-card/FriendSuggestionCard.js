import React from 'react'

const FriendSuggestionCard = ({user}) => {
  return (
   <>
    <li className='display-flex align-items-center margin-bottom-15-px gap-10-px'>
        <img src={user.profilePicture} className='width-32-height-32-px border-radius-50-percentage object-fit-cover' alt='suggested friend'/>
        <span className=''>{user.name}</span>
    </li>
   </>
  )
}

export default FriendSuggestionCard