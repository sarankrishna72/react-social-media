import React from 'react';

export const PostAttachmentItem = ({mimetype, path}) => {
    switch (true) {
        case mimetype.includes("image/"):
            return  <ImageItem path={path}/>
        default:
            break;
    }
  }


  export const ImageItem = ({path}) => {
    return <img src={path} alt="post" className='width-100-percentage max-width-100-percentage height-100-percentage border-radius-6-px' />
  } 

 const PostAttachment = ({attachments}) => {


  const attachmentContainerWidth = (index) => {
    switch (true) {
        case ((attachments.length === 1) || (attachments.length === 3 && index === 2) || (attachments.length === 4 && index === 0)):
            return 'width-100-percentage';
        case ((attachments.length === 2) ||  ((attachments.length > 4) && (index < 2))) :
            return 'width-50-percentage';
        case (((attachments.length === 4) && (index > 0)) || ((attachments.length > 4) && (index > 1))):    
            return 'width-33-percentage'   
        default:
            return 'width-50-percentage';
    }
  }

  return (
    <>
     { attachments?.length > 0 && 
        <div className='display-flex flex-wrap justify-content-space-between'>
                {
                attachments.map((attachment, index) => {
                    return (
                        index < 5 && 
                        <div className={`ripple cursor-pointer  ${attachmentContainerWidth(index)}`} style={{border: '3px solid white'}} key={index}>
                            <div className='position-relative' data-test-id={index}>
                                
                                {
                                    (attachments.length > 5) && (index > 3) &&
                                    <div  className='position-absolute color-ffffff display-flex align-items-center justify-content-center font-size-35-px   top-0-px bottom-0-px right-0-px left-0-px z-index-1 border-radius-6-px' style={{background: "rgb(0 0 0 / 56%)"}}>
                                        {attachments.length - 5}
                                    </div>
                                }
                                
                                <PostAttachmentItem {...attachment}/>
                            </div>
                        </div>
                        
                    )
                    
                })
                    
                }         
        </div>
    }
    </>
   
    
    
  )
}


export default PostAttachment;