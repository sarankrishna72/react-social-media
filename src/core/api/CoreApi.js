import APIInterface from "./ApiInterface";
import { API_END_POINTS } from './Env.Config'

const registerUserApi = () => {
    return new APIInterface(`${API_END_POINTS.authURI}/${API_END_POINTS.registerURI}`);
}

const signInUserApi = () => {
    return new APIInterface(`${API_END_POINTS.authURI}/${API_END_POINTS.signInURI}`);
}

const postsApi = (id = '') => {
    if (id) return new APIInterface(`${API_END_POINTS.postsURI}/${id}`);
    return new APIInterface(`${API_END_POINTS.postsURI}`)
}

const postLikeOrUnlikeApi = (id) => {
    return new APIInterface(`${API_END_POINTS.postsURI}/${id}/${API_END_POINTS.likeURI}`);
}

const userFriedsListApi = (id) => {
    return new APIInterface(`${API_END_POINTS.usersURI}/${id}/${API_END_POINTS.friendsURI}`);
}

const timelinePostsApi = (id) => {
    return new APIInterface(`${API_END_POINTS.postsURI}/${API_END_POINTS.timelineURI}/${id}`);
}

const conversationApi = (id = '') => {
    if (id) return new APIInterface(`${API_END_POINTS.conversationsURI}/${id}`)
    return new APIInterface(`${API_END_POINTS.conversationsURI}`);
}

const conversationMessagesApi = (conversationId) => {
    return new APIInterface(`${API_END_POINTS.messagesURI}/${API_END_POINTS.conversationURI}/${conversationId}`)
}

const createMessageApi = (id) => {
    if (id) return new APIInterface(`${API_END_POINTS.messagesURI}/${id}`)
    return new APIInterface(`${API_END_POINTS.messagesURI}`)
}

const coreAPIs = { registerUserApi, postsApi, timelinePostsApi, signInUserApi, postLikeOrUnlikeApi, userFriedsListApi, conversationApi, conversationMessagesApi, createMessageApi }

export default coreAPIs;