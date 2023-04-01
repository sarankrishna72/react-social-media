import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../UtilScripts/CommonUtil";

const setLoginDetails = (data) => {
    setLocalStorage('loginData', data)
    return true;
}

const getLoginDetails = () => {
    return getLocalStorage('loginData')
}

const removeLoginDetails = () => {
    removeLocalStorage('loginData')
    return true;
}

const isLoggedIn = () => {
    if (getLoginDetails()) return true;
    return false;
}

export {setLoginDetails, getLoginDetails, removeLoginDetails, isLoggedIn}