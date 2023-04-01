import React ,{ useReducer } from 'react';
import './CreatePost.scss';
import Button from '../button/Button';
import Card, { CardHeader, CardBody } from '../card/Card';
import Divider from '../divider/Divider';
import { useSelector } from 'react-redux';
import { encodeImageFileAsURL } from '../../core/UtilScripts/CommonUtil';
import { PostAttachmentItem } from '../post-attachment/PostAttachment';
import FileInput from '../FileInput/FileInput';

const initialState = { description: '', uploadData: [], isClickedAddPhoto: false, isValid: true}

const reducer =  (state, action) => {
    
       switch (action.type) {
        case 'ADD_MEDIA_BUTTON_CLICK':
            if (!state.isClickedAddPhoto) {
                return {...state, ...{isClickedAddPhoto: true}}
            }
            break;
        case  'ADD_MEDIA':
            return {...state, ...{ isValid: false, uploadData: [...state.uploadData,...action.files]}}
        case  'REMOVE_MEDIA':
            return {...state, ...{ uploadData: state.uploadData.filter((data) => data.id !== action.id), isValid: !(state.uploadData.filter((data) => data.id !== action.id).length > 0)}};
        case 'ADD_DESCRIPTION':
            return {...state, ...{description: action.description, isValid: !action.description}}   
        case 'RESET':
            return initialState;   
        default:
            return state;
       }
};




const CreatePostAction = ({postActionClick}) => {

    return (
        <div className='display-flex align-items-center justify-content-space-between'>
            <div role="button" onClick= {() => postActionClick('ADD_MEDIA_BUTTON_CLICK')}  className='post-options align-items-center display-flex border-radius-5-px margin-right-15-px padding-10-px cursor-pointer ripple'>
                <i className="material-icons post-option-item-icon" style={{color: "#f3425f"}}>perm_media</i>
                <span className='font-szie-14-px font-weight-500'>Photo/Video</span>
            </div>
            <div className='post-options align-items-center display-flex border-radius-5-px margin-right-15-px padding-10-px cursor-pointer ripple'>
                <i className="material-icons post-option-item-icon" style={{color: "blue"}}>label</i>
                <span className='font-szie-14-px font-weight-500'>Tag</span>
            </div>
            <div className='post-options align-items-center display-flex border-radius-5-px margin-right-15-px padding-10-px cursor-pointer ripple'>
                <i className="material-icons post-option-item-icon" style={{color: "green"}}>room</i>
                <span className='font-szie-14-px font-weight-500'>Location</span>
            </div>
            <div className='post-options align-items-center display-flex border-radius-5-px margin-right-15-px padding-10-px cursor-pointer ripple'>
                <i className="material-icons post-option-item-icon" style={{color: "goldenrod"}}>sentiment_satisfied</i>
                <span className='font-szie-14-px font-weight-500'>Feelings</span>
            </div>
    </div>
    )
}

const FileUploadContainer = ({state, fileUpload, removeFile}) => {

    

    return(
        <div className='width-100-percentage padding-8-px height-300-px max-height-380-px overflow-auto custom-scrollbar-style primary-border border-radius-6-px margin-bottom-20-px'>
            <div className='bg-primary display-flex align-items-center justify-content-center border-radius-6-px height-100-percentage position-relative'>
                {
                    ( state.uploadData.length > 0) &&
                    <div className='width-100-percentage height-100-percentage position-relative'>
                        <div className=' height-100-percentage display-flex flex-direction-column gap-15-px'>
                            
                            {
                                state.uploadData.map((item, index) => {
                                    return (
                                        <div className='position-relative post-attachment-main-container' key={index}>
                                            <div data-index={index} className='position-absolute opacity-0 post-attachment-action-container border-radius-6-px  z-index-1 top-0-px left-0-px right-0-px bottom-0-px'>
                                                <div className='position-absolute z-index-5 left-10-px top-10-px'>
                                                    <div role="button" className='bg-ffffff display-flex border-radius-6-px ripple cursor-pointer gap-10-px align-items-center justify-content-center padding-top-5-px padding-bottom-5-px padding-left-10-px padding-right-10-px'>
                                                        <FileInput accept="image/*,image/heif,image/heic,video/*,video/mp4,video/x-m4v,video/x-matroska,.mkv" fileUpload={fileUpload}/>
                                                        {/* <AddAPhoto className=''/> */}
                                                        <i className="material-icons edit-photo-icon">photo</i>
                                                        <div className=' display-inline-block font-size-16-px'>Add Photos/Videos</div>
                                                    </div>
                                                </div>
                                                <div role="button" onClick={() => { removeFile(item.id) }} className='close-icon position-absolute z-index-5  border-radius-50-percentage bg-ffffff  right-10-px top-10-px width-30-height-30-px'>
                                                    <div className='width-30-height-30-px border-radius-50-percentage display-flex align-items-center justify-content-center ripple  cursor-pointer'>
                                                        <i className="material-icons edit-photo-icon">close</i>
                                                    </div>
                                                </div>
                                            </div>
                                            <PostAttachmentItem {...item} />
                                        </div>
                                        
                                        
                                    )
                                        
                                })
                            }
                        </div>
                        
                    </div>
                    
                }

                {
                    (state.uploadData.length === 0) &&

                    <>
                        <FileInput accept="image/*,image/heif,image/heic,video/*,video/mp4,video/x-m4v,video/x-matroska,.mkv" fileUpload={fileUpload}/>
                        <div>
                            <div className='padding-10-px display-flex align-items-center justify-content-center width-60-height-60-px margin-0-auto border-radius-50-percentage' style={{background: "#e4e6eb"}}>
                                <i className="material-icons add-photo-icon">add_photo</i>
                            </div>
                            <div className='margin-top-10-px display-inline-block font-size-16-px'>Add Photos/Videos</div>
                            <div className='color-65676b text-align-center font-size-13-px'>or drag and drop</div>
                        </div>
                    </>

                }
                
            </div>
        </div>
    )
  }

const CreatePost = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = useSelector(state => state.user);

  const removeFile = (event) => {
    dispatch({type: "REMOVE_MEDIA", id: event })
  }

  const fileUpload = async (event) => {
    let uploadData = [];
    if (event.target.files.length) {
        for (const item of event.target.files) {
            const result = await encodeImageFileAsURL(item);
            let obj = {
                file: item,
                path: result,
                mimetype: item.type,
                id: Date.now()
            }
            uploadData.push(obj)
        }
    }
    dispatch({type: "ADD_MEDIA", files: uploadData })
  }

  const createPost = () => {
    let formData = new FormData();
    let files = state.uploadData.map((x) => x.file)
    formData.append('description', state.description)
    for (const file of files) {
        formData.append('attachments', file)

    }
    props.createPost(formData)
    dispatch({type: 'RESET'})
   
  }

  return (
    <>
        <Card classes={'min-height-170-px '}>
            <CardHeader classes={'display-flex align-items-center gap-10-px'}>
                    <img src={user.loggedInUser?.profilePicture} className='width-50-height-50-px border-radius-50-percentage object-fit-cover margin-rght-10-px' alt='profile' />
                    <input type='text' value= {state.description}  onChange={(event) => { dispatch({type: 'ADD_DESCRIPTION', description: event.target.value})}} className='width-80-percentage border-width-0-px' placeholder="What's on your mind Sarath ?"/>
            </CardHeader>
            <Divider classes={'margin-top-20-px margin-bottom-20-px width-100-percentage'}/>
            <CardBody>
                
           
                {
                    state.isClickedAddPhoto && <FileUploadContainer fileUpload={fileUpload} removeFile={removeFile} state={state}/>
                }
                
                <div className='display-flex align-items-center justify-content-space-between'>
                   <CreatePostAction postActionClick={(event) => { dispatch({type: event})} }/>
                    <Button disabled={state.isValid} onClick={createPost} type="submit"  btnType={'secondary'} classes={'border-radius-5-px font-weight-500  min-width-150-px'} size={'medium'}>
                        Create Post
                    </Button>
                </div>
            </CardBody>
        </Card>
    </>
  )
}

export default CreatePost;