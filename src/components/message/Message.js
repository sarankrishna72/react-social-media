import React, { useState,useRef, useEffect, useContext } from 'react';
import './Message.scss';
import { timeAgo } from '../../core/UtilScripts/CommonUtil';
import FileInput from '../FileInput/FileInput';
import AudioRecorder from '../audio-recorder/AudioRecorder';
import AudioPlayer from '../audio-payer/AudioPlayer';
import {SocketContext} from '../../context/socket';
import { useSelector } from 'react-redux';


const MessageHeader = ({chatMessageAction, theme, conversation}) => {
    const {callUser} = useContext(SocketContext);
    const user = useSelector(state => state.user);

    const createVideoCall = ()=> {
        // const obj = {
        //     id: conversation.reciepientUser._id,
        //     callingType: 'Video',
        //     callerDetails: {
        //         profilePicture: user.loggedInUser?.profilePicture,
        //         name: `${user.loggedInUser?.fName} ${user.loggedInUser?.lName}`,
        //         id: user.loggedInUser?._id
        //     },
        //     recieverDetails: {
        //         name: conversation.reciepientUser?.name,
        //         profilePicture: conversation.reciepientUser?.profilePicture,
        //         id: conversation.reciepientUser?._id
        //     }
        // }
        callUser(conversation.reciepientUser?._id)
    }

    return(
        <>
            <div className='chat-header height-66-px top-0-px bg-ffffff position-sticky z-index-10'>
                <div className='display-flex padding-10-px align-items-center jusitify-content-space-between width-100-percentage'>
                    <div className='display-flex align-items-center flex-1'>
                        <div className='display-flex align-items-center'>
                            <img className='border-radius-50-percentage width-45-height-45-px' src={conversation?.reciepientUser?.profilePicture} alt='chat profile'/>
                        </div>
                        <div className='padding-left-10-px font-weight-500 line-height-17-px font-size-17-px'>
                            {conversation?.reciepientUser?.name}
                        </div>
                    </div>

                    <div className='chat-action-container display-flex gap-10-px'>
                        <div style={{"--chat-theme-bgcolor": theme}} role="button" title='Start a audio call' onClick={() => {chatMessageAction({actionType: 'START_AUDIO_CALL'})} }  className='width-35-height-35-px set-color-theme ripple display-flex align-items-center justify-content-center cursor-pointer border-radius-50-percentage'>
                            <i className="material-icons font-size-22-px">call</i>
                        </div>
                        <div style={{"--chat-theme-bgcolor": theme}} role="button" title='Start a video call' onClick={() => createVideoCall() } className='width-35-height-35-px set-color-theme ripple display-flex align-items-center justify-content-center cursor-pointer border-radius-50-percentage'>
                            <i className="material-icons font-size-28-px">video_call</i>
                        </div>
                        <div style={{"--chat-theme-bgcolor": theme}} role="button" title='Conversation information' onClick={() => {chatMessageAction({actionType: 'CONVERSATION_INFO'})} } className='width-35-height-35-px set-color-theme ripple display-flex align-items-center justify-content-center cursor-pointer border-radius-50-percentage'>
                            <i className="material-icons font-size-22-px">error</i>
                        </div>
                    </div>
                   
                </div>
            </div>
        </>
    )
}

const MessageItem = ({message, theme}) => {
    return (
        <>
            <div className={`display-flex  align-items-end gap-10-px ${message?.isOwnMessage ? 'flex-direction-row-reverse': ''}`}>
                <img className='width-30-height-30-px object-fit-cover border-radius-50-percentage' title={message?.sender?.name} src={message?.sender?.profilePicture} alt="chat profile"/>
                <div style={{"--chat-theme-bgcolor": theme}} className={`padding-12-px min-width-200-px  font-size-13-px max-width-600-px ${message?.isOwnMessage ? 'own-message' : 'friend-message'}`}>
                    <span dangerouslySetInnerHTML={{__html: message.message || '' }}></span>
                    {message.attachments.length > 0 && 
                        <ChatAttachment theme={theme} item={message.attachments[0]}/>
                    }
                    <div className={`text-align-right font-size-11-px  ${message?.isOwnMessage ? 'color-ffffff' : 'color-65676b'}`}>
                        {timeAgo(message.createdAt)}
                    </div>
                </div>
            </div>
        </>
    )
}

const MessageFooter = ({ theme, chatMessageAction}) => {
    const [message, setMessage] = useState('')
    const [showAudio, setShowAudio] = useState(false)
    const textBoxRef = useRef();

    const handlePaste = (event) => {
        event.preventDefault();
        var text = (event.originalEvent || event).clipboardData.getData('text/plain');
        setMessage(text);
        document.execCommand("insertHTML", false, text);
        
    }

    const handleKeyPress = (event) => {
        setTimeout(() => {
            setMessage(event.target.innerHTML); 
            if(event.key === 'Enter'){
                chatMessageAction({actionType: 'SEND_MESSAGE', messageBody: message })
                textBoxRef.current.innerHTML = '';
                return false;
            }
        },10)
        
        if (event.key === 'Enter') {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
        

    }
    return(
        <>
            <div className='message-footer-container padding-10-px position-sticky bg-ffffff bottom-0-px'>
                <div className='display-flex gap-10-px align-items-center position-relative'>
                    {
                        showAudio &&
                            <AudioRecorder getAudio={(event) =>  { chatMessageAction({actionType: 'SEND_MESSAGE', attachments: [event] } ); setShowAudio(false)}} deletedAudio={() => setShowAudio(false)} theme={theme}/>
                    }
                    <div className='display-flex align-items-center'>
                        <div role="button" title='Open more actions' onClick={() => setShowAudio(true)}  style={{"--chat-theme-bgcolor": theme}} className='width-35-height-35-px set-color-theme ripple display-flex align-items-center justify-content-center cursor-pointer border-radius-50-percentage'>
                            <i className="material-icons font-size-22-px">mic</i>
                        </div>
                        <div role="button" title='Attach a file'  style={{"--chat-theme-bgcolor": theme}} className='width-35-height-35-px set-color-theme ripple display-flex align-items-center justify-content-center cursor-pointer border-radius-50-percentage'>
                            <FileInput accept="image/*,image/heif,image/heic,video/*,video/mp4,video/x-m4v,video/x-matroska,.mkv" fileUpload={(event)=> { chatMessageAction({actionType: 'SEND_MESSAGE', attachments: event.target.files }) }}/>
                            <i className="material-icons font-size-22-px">photo_library</i>
                        </div>
                        <div role="button" title='Choose a gif' onClick={() => chatMessageAction({actionType: 'OPEN_GIF_POPUP' })} style={{"--chat-theme-bgcolor": theme}} className='width-35-height-35-px set-color-theme ripple display-flex align-items-center justify-content-center cursor-pointer border-radius-50-percentage'>
                            <i className="material-icons font-size-22-px">gif_box</i>
                        </div>
                        <div role="button" title='Choose a Emoji' style={{"--chat-theme-bgcolor": theme}}  className='width-35-height-35-px set-color-theme ripple display-flex align-items-center justify-content-center cursor-pointer border-radius-50-percentage'>
                        <i className="material-icons font-size-22-px">mood</i>
                        </div>
                    </div>
                    <div className='input-container padding-right-5-px  align-items-center position-relative  width-100-percentage border-width-0-px border-radius-20-px display-flex'>
                        <div ref={textBoxRef} onKeyPress={handleKeyPress} onPaste={handlePaste} data-ph="Type message here..." contentEditable="true" className='padding-left-15-px max-width-100-percentage word-break-break-all border-width-0-px search flex-1 font-size-14-px' ></div>
                        <div role="button" title='Send message' onClick={()=> {chatMessageAction({actionType: 'SEND_MESSAGE', messageBody: message }); textBoxRef.current.innerHTML = ''; }} style={{"--chat-theme-bgcolor": theme}}  className='width-35-height-35-px set-color-theme ripple display-flex align-items-center justify-content-center cursor-pointer border-radius-50-percentage'>
                            <i className="material-icons font-size-22-px">send</i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const MessageBody = ({messages, theme, conversation}) => {
    return (
        <>
            <div className='message-body padding-top-15-px'>
                <div className='user-information-contaner text-align-center'>
                    <div>
                        <div>
                            <img className='width-70-height-70-px object-fit-cover border-radius-50-percentage' src={conversation?.reciepientUser?.profilePicture} alt="chat profile"/>
                        </div>
                        <div className='font-weight-500 line-height-15-px font-size-15-px margin-top-5-px'>
                            {conversation?.reciepientUser?.name}
                        </div>
                        <div className='color-65676b font-size-13-px font-weight-300 margin-top-5-px'>You're friends on Socialbook</div>
                        <div className='color-65676b font-size-13-px font-weight-300 '>Lives in Pulinchuvadu, Mavelikkara, Alapuzha, India</div>
                    </div>
                </div>
                <div className='message-list-container padding-left-20-px padding-right-20-px margin-top-25-px display-flex flex-direction-column gap-15-px'>
                    {
                        messages?.map((message) => {
                            return <MessageItem key={message._id} theme={theme} message={message}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}



const ChatAttachment = ({item, theme}) => {
    switch (true) {
        case item.mimetype.includes('image/'):
            return(<img className='max-width-174-px border-radius-5-px' src={item.path} alt='chat Attachment'/>)
        case item.mimetype.includes('audio/'):
            return <AudioPlayer path={item.path} theme={theme}/>
        default:
            break;
    }
}


const Message = ({chatAction, theme, messages, conversation}) => {
  const scrollRef = useRef();

  const chatMessageAction = (data) => {
    chatAction(data)
  } 

  

  useEffect(()=> {
    scrollRef.current.scroll(0,scrollRef.current.firstChild.clientHeight)
  },[messages])


  return (
    <>
        <div className='position-relative height-100-percentage'>
            <div className='display-flex flex-direction-column justify-content-space-between height-100-percentage'>
                <div className='height-100-percentage overflow-hidden' >
                    <MessageHeader theme={theme} conversation={conversation} chatMessageAction={chatMessageAction}/>
                    <div ref={scrollRef} className='overflow-auto custom-scrollbar-style scroll-behavior-smooth' style={{height: "calc(100% - 65px)"}}>
                        <MessageBody theme={theme} conversation={conversation} messages={messages}/>
                    </div>
                    
                </div>
                <MessageFooter theme={theme} chatMessageAction={chatMessageAction}/>
            </div>
        </div>
    </>
  )
}

export default Message