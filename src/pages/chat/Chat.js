import React, { useEffect, useContext, useCallback } from 'react';
import './Chat.scss';
import Message from '../../components/message/Message';
import Accordion, { AccordionItem } from '../../components/accordion/Accordion';
import coreAPIs from '../../core/api/CoreApi';
import { timeAgo } from '../../core/UtilScripts/CommonUtil';
import Popup from '../../components/popup/Popup';
import ThemePopup from '../../components/popup/components/ThemePopup';
import {SocketContext} from '../../context/socket';
import { setChat } from '../../redux/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import ChooseAGif from '../../components/choose-a-gif/ChooseAGif';


const ConversationItem = ({conversation, chatAction }) => {
    return(
        <>
            <div onClick={() => { chatAction({actionType: "SELECT_CONVERSATION", selectedConversation: conversation}) } } className='display-flex cursor-pointer ripple chat-item-container padding-left-10-px padding-right-10-px border-radius-6-px padding-top-10-px padding-bottom-6-px'>
                <div className='padding-right-10-px'>
                    <img className='width-55-height-55-px border-radius-50-percentage' src={conversation?.reciepientUser?.profilePicture} alt='profile' />
                </div>
                <div className='padding-top-5-px width-100-percentage' >
                    <span className='font-size-15-px color-050505 line-height-20-px font-weight-400'>{conversation?.reciepientUser?.name}</span>
                    <div className='display-flex justify-content-space-between'>
                        {
                            conversation.lastMessage.message && 
                                <div className='color-65676b  font-weight-300 font-size-12-px white-space-nowrap overflow-hidden text-overflow-ellipsis max-width-150-px'  dangerouslySetInnerHTML={{__html: conversation?.lastMessage?.message }}></div>

                        }

                        {
                        conversation.lastMessage?.attachments?.length > 0 && 
                            <div className='color-65676b  font-weight-300 font-size-12-px white-space-nowrap overflow-hidden text-overflow-ellipsis max-width-150-px'>[attachments]</div>

                        }
                        <div className='color-65676b  font-weight-300 font-size-12-px margin-left-10-px'> . {timeAgo(conversation?.lastMessage.createdAt)}</div>
                    </div>
                </div>
            </div>
        </>
    )
}



const ChatRightBar = ({chatAction, conversation}) => {
    return(
        <>
            <div className='text-align-center display-flex flex-direction-column align-items-center'>
                <div className='padding-left-10-px padding-right-10-px'>
                    <img className='width-80-height-80-px object-fit-cover border-radius-50-percentage' src={conversation?.reciepientUser?.profilePicture} alt='chat person profile'/>
                </div>
                <div className='font-weight-500 line-height-17-px font-size-17-px margin-top-5-px padding-left-10-px padding-right-10-px'>{conversation?.reciepientUser?.name}</div>
                <div className='display-flex gap-15-px margin-top-15-px  padding-left-10-px padding-right-10-px'>
                    <div>
                        <div onClick={() => chatAction({actionType: 'GO_TO_PROFILE'})} className='width-40-height-40-px profile-details-icon ripple  border-radius-50-percentage display-flex align-items-center justify-content-center'>
                            <i className="material-icons font-size-25-px">facebook</i>
                        </div>
                        <div className='margin-top-2-px font-size-13-px'>
                            Profile
                        </div>
                    </div>
                    <div>
                        <div onClick={() => chatAction({actionType: 'MUTE_NOTIFICATIONS'})} className='width-40-height-40-px profile-details-icon ripple  border-radius-50-percentage display-flex align-items-center justify-content-center'>
                            <i className="material-icons font-size-25-px">notifications</i>
                        </div>
                        <div className='margin-top-2-px font-size-13-px'>
                            Mute
                        </div>
                    </div>
                    <div>
                        <div onClick={() => chatAction({actionType: 'SEARCH_IN_CONVERSATION'})} className='width-40-height-40-px profile-details-icon ripple  border-radius-50-percentage display-flex align-items-center justify-content-center'>
                            <i className="material-icons font-size-25-px">search</i>
                        </div>
                        <div className='margin-top-2-px font-size-13-px'>
                            Search
                        </div>
                    </div>
                    
                </div>
                <div className='width-100-percentage'>
                    <Accordion>
                        <AccordionItem classes={'max-height-50-px'} id="1" title={'Customize chat'}>
                            <>
                                <div onClick={() => chatAction({actionType: 'CHANGE_THEME'})} className='display-flex gap-5-px align-items-flex-start profile-accordion-item padding-top-10-px padding-bottom-10-px padding-left-15-px padding-right-15-px cursor-pointer border-radius-6-px'>
                                    <i className="material-icons font-size-22-px" style={{color: "#1877f2"}}>adjust</i>
                                    <div className='font-size-14-px'>
                                        Change theme
                                    </div>
                                </div>
                                <div onClick={() => chatAction({actionType: 'SEARCH_IN_CONVERSATION'})} className='display-flex gap-5-px align-items-flex-start profile-accordion-item padding-top-10-px padding-bottom-10-px padding-left-15-px padding-right-15-px cursor-pointer border-radius-6-px'>
                                    <i className="material-icons font-size-22-px" style={{color: "#1877f2"}}>search</i>
                                    <div className='font-size-14-px'>
                                       Search in conversation
                                    </div>
                                </div>
                            </>
                        </AccordionItem>
                        <AccordionItem classes={'max-height-50-px'} id="2" title={'Media, files and links'}>
                            <>
                                <div onClick={() => chatAction({actionType: 'MEDIA_ITEMS', mediaType: 'MEDIA'})} className='display-flex gap-5-px align-items-flex-start profile-accordion-item padding-top-10-px padding-bottom-10-px padding-left-15-px padding-right-15-px cursor-pointer border-radius-6-px'>
                                    <i className="material-icons font-size-22-px" style={{color: "#1877f2"}}>photo_library</i>
                                    <div className='font-size-14-px'>
                                        Media
                                    </div>
                                </div>
                        
                                <div onClick={() => chatAction({actionType: 'MEDIA_ITEMS', mediaType: 'FILES'})} className='display-flex gap-5-px align-items-flex-start profile-accordion-item padding-top-10-px padding-bottom-10-px padding-left-15-px padding-right-15-px cursor-pointer border-radius-6-px'>
                                    <i className="material-icons font-size-22-px" style={{color: "#1877f2"}}>description</i>
                                    <div className='font-size-14-px'>
                                        Files
                                    </div>
                                </div>
                                <div onClick={() => chatAction({actionType: 'MEDIA_ITEMS', mediaType: 'LINKS'})} className='display-flex gap-5-px align-items-flex-start profile-accordion-item padding-top-10-px padding-bottom-10-px padding-left-15-px padding-right-15-px cursor-pointer border-radius-6-px'>
                                    <i className="material-icons font-size-22-px" style={{color: "#1877f2", transform: 'rotate(120deg)'}}>link</i>
                                    <div className='font-size-14-px'>
                                        Links
                                    </div>
                                </div>
                            </>
                        </AccordionItem>
                        <AccordionItem classes={'max-height-50-px'} id="3" title={'Privacy & Supports'}>
                            <>
                                <div onClick={() => chatAction({actionType: 'BLOCK'})} className='display-flex gap-5-px align-items-center profile-accordion-item padding-top-10-px padding-bottom-10-px padding-left-15-px padding-right-15-px cursor-pointer border-radius-6-px'>
                                    <i className="material-icons font-size-22-px" style={{color: "#1877f2"}}>block</i>
                                    <div className='font-size-14-px'>
                                        Block
                                    </div>
                                </div>

                                <div onClick={() => chatAction({actionType: 'REPORT_PROBLEM'})} className='display-flex gap-5-px align-items-center profile-accordion-item padding-top-10-px padding-bottom-10-px padding-left-15-px padding-right-15-px cursor-pointer border-radius-6-px'>
                                    <i className="material-icons font-size-22-px" style={{color: "#1877f2"}}>report_problem</i>
                                    <div className='font-size-14-px text-align-left'>
                                        Report
                                        <div className='font-size-12-px color-65676b'>Give feedback and report the conversation</div>
                                    </div>
                                </div>
                            </>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </>
    )
}

const Chat = () => {
  const chatState = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const {socket } = useContext(SocketContext)

  const messageSendRecieveCallbackAction = useCallback((data) => {
    const conversation = JSON.parse(JSON.stringify((chatState.selectedConversation)));
    conversation.lastMessage = data;
    const conversationList = JSON.parse(JSON.stringify((chatState.conversationList)));
    for (const conversation of conversationList) {
        if ((conversation._id === data.conversationId)) {
            conversation['lastMessage'] = data;
        }
    }
    let messages = chatState.messagesList.filter(x => x._id !== data._id)
    messages = [...messages, ...[data]]
    return {conversation, conversationList, messages}
  }, [chatState.selectedConversation, chatState.messagesList, chatState.conversationList])

  useEffect(() => {
    socket.on("RECIEVE_MESSAGE", (data) => {
        let obj = messageSendRecieveCallbackAction(data);
        dispatch(setChat({type: "SELECT_CONVERSATION", selectedConversation: obj.conversation}))
        dispatch(setChat({type: "CONVERSATION_LIST_INITAIL", conversationList: obj.conversationList}))
        dispatch(setChat({type: "SET_MESSAGES_INITIAL", messagesList: obj.messages}))
    })
  },[socket, dispatch, messageSendRecieveCallbackAction])


  useEffect(() => {
    coreAPIs.conversationApi().get().then(res => {
        dispatch(setChat({type: 'CONVERSATION_LIST_INITAIL', conversationList: res.data}))
    })
  },[dispatch])


  const chatAction = async(event) => {
    switch (event.actionType) {
        case 'CONVERSATION_INFO':
            dispatch(setChat({type: event.actionType , isShowRightBar: !chatState.isShowRightBar}))
            break;
        case 'SELECT_CONVERSATION':
            if (event.selectedConversation._id !== chatState.selectedConversation._id) {
                coreAPIs.conversationMessagesApi(event.selectedConversation._id).get().then(
                    res => {
                        dispatch(setChat({type: "SET_MESSAGES_INITIAL" , messagesList: res.data}));
                        socket.emit("JOIN_PRIVATE_CHAT", event.selectedConversation._id)
                        dispatch(setChat({type: event.actionType, selectedConversation: event.selectedConversation}))
                        dispatch(setChat({type: "SELECTED_THEME", selectedTheme: event.selectedConversation.theme}))
                    }
                )
            }
            break;
        case 'CHANGE_THEME':
            dispatch(setChat({type: 'TOGGLE_POPUP' , popupType: 'THEME_POPUP'}))
            break; 
        case 'SELECTED_THEME':
            dispatch(setChat({type: event.actionType , selectedTheme: event.theme}))
            break;   
        case 'SET_THEME':
            if (chatState.selectedConversation && (chatState.selectedConversation?.theme !== event.theme)) {
                coreAPIs.conversationApi(chatState.selectedConversation._id).patch({theme: event.theme}).then(res => {
                    dispatch(setChat({type: "SELECT_CONVERSATION", selectedConversation: res.data}))
                    dispatch(setChat({type: 'TOGGLE_POPUP'}))
                })
            }
            break;      
        case 'CLOSE':
            dispatch(setChat({type: 'SELECTED_THEME', selectedTheme: chatState.selectedConversation.theme}))
            dispatch(setChat({type: 'TOGGLE_POPUP'}))
            break;

        case 'OPEN_GIF_POPUP':
            dispatch(setChat({type: 'TOGGLE_POPUP' , popupType: 'GIF_POPUP'}))
            break;    
        case 'SEND_MESSAGE':
            if ( event.messageBody || event.attachments.length > 0 ) {
                let formData = new FormData()
                formData.append('message', event.messageBody || '');
                formData.append('conversationId', chatState.selectedConversation._id)
                if (event.attachments) {
                    for (const file of event.attachments) {
                        formData.append('attachments', file)
                    }
                }
                
                coreAPIs.createMessageApi().post(formData).then(res => {
                    const socketMessage = {...res.data, ...{isOwnMessage: false}}
                    socket.emit("SEND_MESSAGE", socketMessage);
                    let obj = messageSendRecieveCallbackAction(res.data);
                    dispatch(setChat({type: "SELECT_CONVERSATION", selectedConversation: obj.conversation}))
                    dispatch(setChat({type: "CONVERSATION_LIST_INITAIL", conversationList: obj.conversationList}))
                    dispatch(setChat({type: "SEND_MESSAGE", message: res.data}))
                })
            }
           
            break;    
        default:
            break;
    }
  }  


  return (
    <>  
        {chatState.isShowPopup &&
            <Popup contentWidthClassess={'width-100-percentage max-width-500-px'}  overlayClose={true}>
                {(() => {
                    switch(chatState.popupType) {
                        case 'THEME_POPUP':
                            return <ThemePopup selectedTheme={chatAction} closePopup={chatAction }/>
                        case 'GIF_POPUP':    
                            return  <ChooseAGif close={() =>  dispatch(setChat({type: 'TOGGLE_POPUP'})) } selectGifEvent={(event) => {chatAction({actionType: "SEND_MESSAGE", attachments: [event.file]});dispatch(setChat({type: 'TOGGLE_POPUP'})); }} />
                        default:
                            return <></>
                    }
                })()}
            </Popup>
        }
        
        <div className='width-100-percentage bg-ffffff display-flex flex-wrap container-height overflow-auto'>
            <div className='flex-2 bg-ffffff  padding-left-10-px  height-100-percentage position-sticky top-0-px'>
                <div className='bg-ffffff z-index-10 bg-ffffff padding-top-20-px position-sticky top-0-px'>
                    <div className='position-sticky top-20-px z-index-10 bg-ffffff padding-right-20-px'>
                        <div className='height-35-px padding-left-10-px'>
                            <h2 className='margin-0-px'>Chats</h2>
                        </div>
                        <div className='padding-left-10-px padding-bottom-24-px'>
                            <div className='input-container display-flex align-items-center position-relative  width-100-percentage margin-top-10-px border-width-0-px border-radius-20-px display-flex'>
                                <span className='padding-left-10-px padding-top-3-px'>
                                    <svg fill="currentColor" viewBox="0 0 16 16" width="1em" height="1em" className='color-65676b'>
                                        <g fillRule="evenodd" transform="translate(-448 -544)">
                                            <g fillRule="nonzero">
                                                <path d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z" transform="translate(448 544)"></path>
                                                <path d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z" transform="translate(448 544)"></path>
                                                <path d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z" transform="translate(448 544)"></path>
                                                <path d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z" transform="translate(448 544)"></path>
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                                <input className='border-width-0-px search flex-1 font-size-14-px' placeholder='Search Messenger'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' padding-right-10-px overflow-auto custom-scrollbar-style ' style={{height: 'calc(100% - 130px)'}}>
                    {
                        chatState?.conversationList.map((conversation) => {
                            return <ConversationItem chatAction={chatAction} conversation={conversation} key={conversation._id}/>
                        })
                    }
                </div>
            </div>
            <div className='flex-8 display-flex height-100-percentage'>
                <div className='flex-6 chat-list-container height-100-percentage' >

                    { chatState.isShowMessage &&
                        <Message theme={chatState.selectedTheme} conversation={chatState.selectedConversation} messages={chatState.messagesList} chatAction={chatAction}/>
                    }

                    {
                        !chatState.isShowMessage &&
                            <div className='height-100-percentage empty-chat display-flex align-items-center justify-content-center flex-direction-column' data-image="https://doot-light.react.themesbrand.com/static/media/pattern-05.ffd181cd.png">
                                <div className='empty-icon-container width-95-height-95-px border-radius-50-percentage display-flex align-items-center justify-content-center'>
                                    <i className='material-icons emtpty-chat-icon'>chat_bubble</i>
                                </div>
                                <h4 className='color-000000 font-weight-400 font-size-20-px margin-top-10-px margin-bottom-5-px'>It's nice to chat with someone</h4>
                                <div className='color-000000 font-weight-300 font-size-14-px '>Pick a person from left menu and start your conversation</div>
                            </div>
                    }

                    </div>
                    {
                    chatState.isShowRightBar &&
                    <div className={`flex-2 right-bar-container overflow-auto custom-scrollbar-style bg-ffffff  padding-left-10-px padding-top-20-px padding-right-10-px  height-100-percentage position-sticky top-0-px`}>
                        <ChatRightBar chatAction={chatAction} conversation={chatState.selectedConversation}/>
                    </div>
                    }
                </div>
           
           
        </div>
    </>
  )
}

export default Chat