import React, { useContext } from 'react';
import { SocketContext } from '../../context/socket';
import Button from '../button/Button';
import Card from '../card/Card';
import './IncomingCallPopup.scss';
const IncomingCallPopup = () => {
    const {answerCall, call, callAccepted} = useContext(SocketContext);
  return (
    <>
        {
            call?.isReceivingCall && !callAccepted &&
            (<div className=''>
                <Card classes={`max-width-360-px position-absolute padding-15-px top-10-px z-index-111 right-10-px`}>
                    <div className='answer-call-container '>
                        <div className='display-flex justify-content-space-between align-items-center'>
                            <div>
                                <div className='font-weight-500 font-size-15-px'>{call?.callerDetails?.name}</div>
                                <div className='font-weight-300 font-size-13-px'> {call?.callingType == 'Video' ? 'Incoming Video Call' : 'Incoming Audio Call' } </div>
                            </div>
                            <div>
                                <img src={call.callerDetails?.profilePicture} className='width-50-height-50-px border-radius-50-percentage object-fit-cover' alt='error'/>
                            </div>
                        </div>
                        <div className='display-flex gap-10-px margin-top-5-px'>
                            <div className='flex-1'>
                                <Button type="submit"  btnType={'secondary'} classes={'border-radius-5-px reject-call-btn width-100-percentage font-weight-400  min-width-150-px'} size={'medium'}>
                                    DECLINE
                                </Button>
                            </div>
                            <div className='flex-1'>
                                <Button type="submit" onClick={answerCall}  btnType={'secondary'} classes={'border-radius-5-px width-100-percentage font-weight-400  min-width-150-px'} size={'medium'}>
                                    ANSWER
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>)

        }
        
    </>
  )
}

export default IncomingCallPopup;