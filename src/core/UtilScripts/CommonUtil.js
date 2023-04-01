
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

export const getCookieData = (cookieItems) => {
    // const name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    var cookieObj = {}
    for (const item of cookieItems) {
        let c = ca.filter((x) => x.includes(`_${item}=`))[0]
        if (c) {
            while(c.charAt(0) === " ") {
                c = c.substring(1)
            }
            cookieObj[item] = c.substring(`_${item}=`.length, c.length);
        } else return {}
       
    }
    return cookieObj;
}


export const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
}))

export const dataURLtoFile = (dataurl, filename) => {
   var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
   bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
   while(n--){
   u8arr[n] = bstr.charCodeAt(n);
   }
 return new File([u8arr], filename, {type:mime});
}




export const setLocalStorage = (name, data) => {
    localStorage.setItem(name, btoa(unescape(encodeURIComponent(JSON.stringify(data)))));
    return true;
}

export const getLocalStorage = (name) => {
    if (localStorage.getItem(name))  return (JSON.parse(atob(localStorage.getItem(name))))
    return false;
   
}

export const removeLocalStorage = (name) => {
    localStorage.removeItem(name);
    return true;
}


export const encodeImageFileAsURL = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


export const chatThemes = [
    "radial-gradient(circle at center 75%, rgb(247, 215, 0) 0%, rgb(247, 215, 0) 50%, rgb(247, 215, 0) 100%)",
    "radial-gradient(circle at center 75%, rgb(237, 159, 154) 0%, rgb(237, 159, 154) 50%, rgb(237, 159, 154) 100%)",
    "radial-gradient(circle at center 75%, rgb(47, 169, 228) 0%, rgb(100, 143, 235) 50%, rgb(155, 115, 242) 100%)",
    "radial-gradient(circle at center 75%, rgb(130, 2, 2) 0%, rgb(152, 12, 12) 50%, rgb(163, 17, 17) 100%)",
    "radial-gradient(circle at center 75%, rgb(147, 20, 16) 0%, rgb(147, 20, 16) 50%, rgb(147, 20, 16) 100%)",
    "radial-gradient(circle at center 75%, rgb(202, 52, 255) 0%, rgb(48, 44, 255) 50%, rgb(186, 0, 156) 100%)",
    "radial-gradient(circle at center 75%, rgb(0, 128, 255) 0%, rgb(159, 26, 255) 100%)",
    "radial-gradient(circle at center 75%, rgb(241, 97, 78) 0%, rgb(102, 15, 132) 100%)",
    "radial-gradient(circle at center 75%, rgb(74, 201, 228) 0%, rgb(88, 144, 255) 50%, rgb(140, 145, 255) 100%)",
    "radial-gradient(circle at center 75%, rgb(255, 35, 154) 0%, rgb(255, 140, 33) 100%)",
    "radial-gradient(circle at center 75%, rgb(0, 213, 47) 0%, rgb(0, 101, 40) 100%)",
    "radial-gradient(circle at center 75%, rgb(0, 199, 211) 0%, rgb(54, 83, 232) 100%)",
    "radial-gradient(circle at center 75%, rgb(255, 13, 158) 0%, rgb(249, 0, 90) 100%)",
    "radial-gradient(circle at center 75%, rgb(0, 82, 205) 0%, rgb(0, 161, 230) 50%, rgb(0, 82, 205) 100%)",
    "rgb(96, 96, 96)",
    "radial-gradient(circle at center 75%, rgb(170, 0, 255) 0%, rgb(0, 128, 255) 100%)",
    "radial-gradient(circle at center 75%, rgb(0, 95, 255) 0%, rgb(146, 0, 255) 50%, rgb(255, 46, 25) 100%)",
    "radial-gradient(circle at center 75%, rgb(255, 143, 178) 0%, rgb(167, 151, 255) 50%, rgb(0, 229, 255) 100%)",
    "radial-gradient(circle at center 75%, rgb(251, 69, 222) 0%, rgb(132, 29, 213) 50%, rgb(58, 29, 138) 100%)",
    "radial-gradient(circle at center 75%, rgb(85, 0, 41) 0%, rgb(170, 50, 50) 50%, rgb(217, 169, 0) 100%)",
    "radial-gradient(circle at center 75%, rgb(242, 92, 84) 0%, rgb(244, 132, 95) 50%, rgb(247, 178, 103) 100%)",
    "radial-gradient(circle at center 75%, rgb(250, 175, 0) 0%, rgb(255, 46, 46) 50%, rgb(58, 18, 255) 100%)",
    "radial-gradient(circle at center 75%, rgb(255, 210, 0) 0%, rgb(110, 223, 0) 50%, rgb(0, 223, 187) 100%)",
    "radial-gradient(circle at center 75%, rgb(42, 127, 227) 0%, rgb(0, 191, 145) 50%, rgb(159, 213, 45) 100%)",
    "radial-gradient(circle at center 75%, rgb(255, 98, 91) 0%, rgb(197, 50, 173) 50%, rgb(77, 62, 194) 100%)",
    "radial-gradient(circle at center 75%, rgb(94, 0, 126) 0%, rgb(51, 18, 144) 50%, rgb(40, 37, 181) 100%)",
    "rgb(255, 49, 30)",
    "rgb(167, 151, 255)",
    "rgb(251, 69, 222)",
    "rgb(0, 153, 255)",
    "rgb(170, 50, 50)",
    "rgb(242, 92, 84)",
    "rgb(250, 175, 0)",
    "rgb(110, 223, 0)",
    "rgb(77, 62, 194)",
    "rgb(94, 0, 126)",
]



// English.

TimeAgo.addDefaultLocale(en)
export const timeAgo =  (date) => {
    let time = new Date(date);
    return new TimeAgo('en-IN').format(time)
} 