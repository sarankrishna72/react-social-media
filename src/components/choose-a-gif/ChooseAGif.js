import React, { useEffect, useReducer, useRef} from 'react';
import { toDataURL, dataURLtoFile } from '../../core/UtilScripts/CommonUtil';
import { Card, CardBody, CardHeader } from '../card/Card';

const initialState = {
    gifs: [],
    query: {
        count: 20,
        offset: 0,
        q: 'social'
    },
    loader: false
}


const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_GIFS":
          return  Object.assign({}, state, {gifs: action.gifs})
        case 'QUERY':
            return  Object.assign({}, state, {query: action.query})
        case "LOADER":
            return  Object.assign({}, state, {loader: !state.loader}) 
        default:
          return state;
      }
}
const ChooseAGif = ({selectGifEvent, close}) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const listInnerRef = useRef();

  const onScroll = () => {
    if (listInnerRef.current && !state.loader) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        let q = JSON.parse(JSON.stringify(state.query))
        q = {...q, ...{offset: q.offset + 1}}
        dispatch({
            type: 'QUERY',
            query: q
        })
        setTimeout(() => {
            fetchGif(q)
        },100)
        
      }
    }
  };

  const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  }

  const searchGifs = debounce((event) => {
    let q = {
        type: "QUERY",
        query: {
            count: 20,
            offset: 0,
            q: event.target.value
        }
        
    }
    dispatch(q)
    searchGifsApi(q.query);
  },1000)

  const searchGifsApi = (query) => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${query.q}&limit=${query.count}&offset=${query.offset}`).then(response => {
        return response.json();
    }).then(json => {
        dispatch({
            type: 'ADD_GIFS',
            gifs: json.data
        })
        dispatch({ type: "LOADER" })
    }).catch(
        dispatch({ type: "LOADER"})
    ); 
  }

  useEffect(() => {
    fetchGif(state.query)
  }, [])

  

  const fetchGif = (query) => {
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${query.q}&limit=${query.count}&offset=${query.offset}`).then(response => {
        return response.json();
    }).then(json => {
        let v = JSON.parse(JSON.stringify(state.gifs))
        v = v.concat(json.data)
        dispatch({
            type: 'ADD_GIFS',
            gifs: v
        })
        dispatch({ type: "LOADER" })
    }).catch(
        dispatch({ type: "LOADER"})
    );
    
  }


  const selectGif = (url) => {
    toDataURL(url).then(dataUrl => {
        let fileData = dataURLtoFile(dataUrl, "imageName.jpg");
        selectGifEvent({
            file: fileData,
            path: dataUrl,
            mimetype: fileData.type,
            id: Date.now()
        })
      })
  }



  
  return (
    <>
        <Card style={{padding: "0px"}} classes={'overflow-hidden'}>
                <CardHeader >
                    <div  className={'color-000000 themes-header-container display-flex align-items-center justify-content-center height-60-px position-relative width-100-percentage padding-left-10-px font-weight-600 font-size-18-px padding-right-10-px position-relative'}>
                        <div className='width-30-height-30-px bg-e4e6eb  border-radius-50-percentage display-flex align-items-center justify-content-center position-absolute cursor-pointer left-10-px top-15-px'>
                            <span className="material-symbols-outlined" onClick={() => close({actionType: 'CLOSE'})}>arrow_back</span>
                        </div>
                        <div>
                            Choose a GIF
                        </div>
                        {/* <PopupClose classes={'position-absolute right-10-px top-15-px'}/> */}
                    </div>
                    <CardBody classes={'padding-0-px'}>
                        <div>
                            <div className='display-flex flex-wrap-wrap justify-content-space-between padding-15-px'>
                                <div className='input-container display-flex align-items-center position-relative  width-100-percentage  border-width-0-px border-radius-20-px display-flex'>
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
                                    <input onKeyPress={searchGifs} className='border-width-0-px search flex-1 font-size-14-px' placeholder='Search GIF'/>
                                </div>
                            </div>
                            <div className='gif-container max-height-500-px overflow-auto custom-scrollbar-style width-100-percentage' onScroll={onScroll} ref={listInnerRef}>
                                {
                                    state.gifs.map((gif, index) => {
                                        return (
                                            <div className='width-100-percentage display-flex cursor-pointer ripple' key={index}>
                                                <img onClick={() => selectGif(gif.images?.downsized?.url)} src={gif.images?.downsized?.url}  className='width-100-percentage' alt='error' />
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                        
                     
                    </CardBody>
                </CardHeader>
            </Card>
    </>
  )
}

export default ChooseAGif