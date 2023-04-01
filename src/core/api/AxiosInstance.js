import axios from "axios";
import { getLoginDetails, isLoggedIn, setLoginDetails } from "../auth/Auth";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
})

instance.interceptors.request.use((req) => {
    if (isLoggedIn()) {
        const {authenticationToken, _id} = getLoginDetails()
        req.headers['x-auth-token'] = authenticationToken;
        req.headers['x-auth-id'] = _id;
    }
    return req;
})


instance.interceptors.response
.use(
    (response) => {
        if (response.data && response.data.authenticationToken) setLoginDetails(response.data);
        return response;
    }
)

export default instance;