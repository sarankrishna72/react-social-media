import React, { useEffect, useState } from 'react';
import './Home.scss';
import Leftbar from '../../components/leftbar/Leftbar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import coreAPIs from '../../core/api/CoreApi';
import { getLocalStorage } from '../../core/UtilScripts/CommonUtil';
// import {SocketContext} from '../../context/socket';
export const Home = () => {
  const [posts, setPosts] = useState([]);
  // const {socket } = useContext(SocketContext)
  useEffect(() => {
    coreAPIs.timelinePostsApi(getLocalStorage('loginData').username).get().then(
      res => {
        setPosts(res.data)
      }
    )
  }, [])


  return (
    <>
   

      <div className='display-flex width-100-percentage position-relative'>
        
          <Leftbar classes={'flex-3 position-sticky top-50-px  padding-20-px'} />
          <div className='flex-7  padding-20-px overflow-auto custom-scrollbar-style' style={{height: "calc(100vh - 50px)"} }>
            <Feed posts={posts}/>
          </div>
          <div className='flex-4 position-sticky top-50-px overflow-auto custom-scrollbar-style  padding-20-px' style={{height: "calc(100vh - 50px)"} }>
            <Rightbar />
          </div>
      </div>
    </>
  )
}
