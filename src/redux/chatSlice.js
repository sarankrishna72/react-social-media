import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isShowRightBar: false,
    conversationList: [],
    isShowMessage: false,
    messagesList: [],
    selectedConversation:  {},
    isShowPopup: false,
    popupType: '',
    selectedTheme: ''
}

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        setChat:  (state, action) => {
       
            switch (action.payload.type) {
                case 'CONVERSATION_INFO':
                    return {...state, ...{ isShowRightBar: action.payload.isShowRightBar}}
                case  'CONVERSATION_LIST_INITAIL':
                    return {...state, ...{ conversationList: action.payload.conversationList} }
                case 'SELECT_CONVERSATION':
                    return {...state, ...{ isShowMessage: true, isShowRightBar: action.payload.selectedConversation.isInfoOpen, selectedTheme: action.payload.selectedConversation.theme, selectedConversation: action.payload.selectedConversation}}    
                case 'SET_MESSAGES_INITIAL':
                    return {...state, ...{ messagesList: action.payload.messagesList} }
                case 'SEND_MESSAGE':
                    return {...state, ...{ messagesList: [...state.messagesList, ...[action.payload.message]] } }   
                case 'TOGGLE_POPUP':     
                    return {...state, ...{popupType: action.payload.popupType, isShowPopup: !state.isShowPopup} }    
                case 'SELECTED_THEME':
                    return {...state, ...{selectedTheme: action.payload.selectedTheme} }    
                case 'RESET':
                    return initialState;   
                default:
                    return state;
            }
        }
    }
})

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;