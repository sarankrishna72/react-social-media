import React, {useContext,useEffect} from 'react';
import './VideoAudioCall.scss';
import {SocketContext} from '../../context/socket';
import Popup from '../popup/Popup';


const VideoAudioCall = () => {
    const { callInitiate, callAccepted, myVideo,userVideo, callEnded } = useContext(SocketContext)
  useEffect(() => {
    callInitiate().then(
        (res) => {
            console.log('====================================');
            console.log(res);
            console.log('====================================');
        }
    )
  },[])

  useEffect(() => {
    console.log('====================================');
    console.log(userVideo);
    console.log('====================================');
  })
  return (
    <Popup overlayClose={true} contentWidthClassess={'width-100-percentage height-100-percentage'}>
        <div className='top-0-px display-flex flex-direction-column justify-content-flex-end bottom-0-px left-0-px right-0-px height-100-percentage width-100-percentage z-index-100 video-call-container' >
            <div className='position-relative height-100-percentage'>
                {
                    // stream && (
                        <div className='reciepient-caller height-140-px width-120-px  position-absolute top-15-px border-radius-10-px right-15-px overflow-hidden'>
                            <video height={160}  playsInline muted ref={myVideo} autoPlay className={'width-100-percentage object-fit-cover'} />
                        </div>
                    // )
                }

            
                
                {callAccepted && !callEnded && (
                    <video playsInline ref={userVideo} autoPlay className={'width-100-percentage'} />
                )}
                <div className='display-flex position-absolute bottom-0-px left-0-px right-0-px width-100-percentage padding-bottom-30-px justify-content-center align-items-center gap-10-px'>
                    <div className='width-55-height-55-px border-radius-50-percentage cursor-pointer ripple bg-ffffff display-flex justify-content-center align-items-center'>
                        <span className="material-icons font-size-28-px">photo_camera</span>
                    </div>
                    <div className='width-55-height-55-px border-radius-50-percentage cursor-pointer ripple display-flex justify-content-center align-items-center' style={{background: "rgb(234,67,53)"}}>
                        <span className="material-icons font-size-28-px color-ffffff">call</span>
                    </div>
                    <div className='width-55-height-55-px border-radius-50-percentage cursor-pointer bg-ffffff ripple display-flex justify-content-center align-items-center' >
                        <span className="material-icons font-size-28-px">mic_off</span>
                    </div>
                </div>
            </div>
        </div>
    </Popup>
   
  )
}

export default VideoAudioCall