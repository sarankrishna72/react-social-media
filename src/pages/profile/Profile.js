import React,  { useMemo } from 'react';
import './Profile.scss';
import Leftbar from '../../components/leftbar/Leftbar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import { useParams } from 'react-router-dom';
import coreAPIs from '../../core/api/CoreApi';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const Profile = () => {
  const { username } = useParams();
  const user = useSelector(state => state.user);


  useEffect(() => {
    window.scrollTo(0, 0)    
    let initalApiRequset ;
    if (user.username !== username) {
         initalApiRequset = () => {
            Promise.all(
                [coreAPIs.userFriedsListApi(username).get()]
            ).then(res => {
                console.log('====================================');
                console.log(res);
                console.log('====================================');
            })
        }
       
    } else {
        initalApiRequset = () => {
            coreAPIs.userFriedsListApi(username).get().then((res) => {
                console.log('====================================');
                console.log(res);
                console.log('====================================');
            })
        }
    }
    
    initalApiRequset();
  },[username, user.username])
 





  return (
    <>
        <div className='display-flex width-100-percentage'>
            <Leftbar classes={'flex-3 position-sticky top-50-px'} />
            <div className='flex-11'>
                <div>
                    <div className='height-320-px position-relative'>
                        <img src='/assets/images/person/3.jpeg' className='profile-cover-img width-100-percentage height-250-px object-fit-cover' alt='profile cover' />
                        <img src='/assets/images/person/1.jpeg' className='profile-img width-150-height-150-px bottom-0-px position-absolute object-fit-cover border-radius-50-percentage left-0-px right-0-px margin-0-auto' alt='profile' />
                    </div>
                    <div className='profile-info display-flex flex-direction-column align-items-center justify-content-center'>
                        <h4 className='profile-info-name font-size-24-px margin-bottom-5-px'>Sarath Chandran P R</h4>
                        <span className='profile-info-description font-weight-300 font-size-15-px max-width-80-percentage text-align-center'>
                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
                        </span>
                    </div>
                </div>
                
                <div className='display-flex'>
                    <div className='flex-7 padding-20-px '>
                        <Feed posts={[]} />
                    </div>
                    <div className='flex-4 position-sticky top-50-px overflow-auto custom-scrollbar-style padding-20-px ' style={{height: "calc(100vh - 50px)"} }>
                        <Rightbar profile/>
                    </div>
                </div>
            
            </div>
        </div>
    </>
  )
}

export default Profile