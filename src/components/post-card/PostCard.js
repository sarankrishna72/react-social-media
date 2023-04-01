import React, { useEffect, useState } from 'react';
import './PostCard.scss';
import Card, { CardBody, CardFooter, CardHeader } from '../card/Card';
import Divider from '../divider/Divider';
import coreAPIs from '../../core/api/CoreApi';
import { Link } from 'react-router-dom';
import PostAttachment from '../post-attachment/PostAttachment';
import { timeAgo } from '../../core/UtilScripts/CommonUtil';

const PostCard = ({post}) => {
  const [like, setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (post.isUserLiked) {
      setIsLiked(true)
    }
  }, [post])

  const likeHandler = () => {
    coreAPIs.postLikeOrUnlikeApi(post._id).post().then((res) => {
      setLike((isLiked ? (like - 1 ): (like + 1)))
      setIsLiked(!isLiked);
    }).catch(err => {
      console.log(err);
    })
    

  }

  return (
    <>
    <Card classes={'margin-top-20-px '}>
      <CardHeader classes={'post-top-section display-flex justify-content-space-between align-items-center'}>
        <div className='display-flex gap-15-px align-items-start'>
          <Link to={`/Profile/${post.user?.username}`}>
            <img src={ post.user?.profilePicture} alt='post profile' className='width-45-height-45-px border-radius-50-percentage  object-fit-cover' />
          </Link>
          <div className='margin-top-5-px'>
            <div className='color-050505 font-weight-600 font-size-15-px margin-bottom-3-px line-height-15-px'>{post.user?.fName + ' ' + post.user?.lName }</div>
            <div className='font-size-12-px color-65676b '> {timeAgo(post?.createdAt)}</div>
          </div>
        </div>
        <div className='ripple width-45-height-45-px cursor-pointer display-flex align-items-center justify-content-center border-radius-50-percentage'>
          <i className="material-icons font-size-35-px color-65676b">more_vert</i>
        </div>
      </CardHeader>
      <CardBody>
        <div className='margin-top-10-px margin-bottom-10-px'>
          <span className=''>{post?.description}</span>
          <div className='display-flex flex-wrap-wrap'>
            <PostAttachment  attachments={post.attachments}/>
          </div>
        </div>
      </CardBody>
      <CardFooter classes={'width-100-percentage'}>
        <span className='display-flex align-items-center justify-content-space-between'>
          <div className='display-flex align-items-center'>
            <img src='/assets/images/like.png' className='width-25-height-25-px object-fit-cover' alt='like' />
            <span className='padding-left-5-px color-65676b font-size-15-px'>{like}</span>
          </div>
          <div className='display-flex align-items-center'>
            <span className='padding-left-5-px color-65676b font-size-15-px'>{post.comments || 0} Comments</span>
          </div>
        </span>
        <Divider classes={'margin-top-13-px'}/>
        <div className='padding-top-5-px padding-bottom-5-px padding-left-5-px padding-right-5-px display-flex gap-5-px'>
          <div onClick={likeHandler} className='display-flex flex-1 justify-content-center ripple align-items-center gap-5-px cursor-pointer hover-post-action padding-top-10-px padding-bottom-10-px padding-left-30-px padding-right-30-px border-radius-6-px'>
            <i className="material-symbols-outlined font-size-22-px" style={{ color: isLiked ? '#1877f2' : '#65676b'}}>thumb_up_off</i>
            <span className={`font-weight-600 font-size-15-px  ${ isLiked ? 'color-1877f2': 'color-65676b'}`}>Like</span>
          </div>
          <div className='display-flex flex-1 justify-content-center ripple align-items-flex-start gap-5-px cursor-pointer hover-post-action padding-top-10-px padding-bottom-10-px padding-left-30-px padding-right-30-px border-radius-6-px'>
            <i className="material-symbols-outlined font-size-22-px color-65676b">chat</i>
            <span className='font-weight-600 font-size-15-px color-65676b margin-bottom-4-px'>Comment</span>
          </div>
          <div className='display-flex flex-1 justify-content-center ripple align-items-center gap-5-px cursor-pointer hover-post-action padding-top-10-px padding-bottom-10-px padding-left-30-px padding-right-30-px border-radius-6-px'>
            <i className="material-symbols-outlined font-size-22-px color-65676b">share</i>
            <span className='font-weight-600 font-size-15-px color-65676b'>Share</span>
          </div>
        </div>
      </CardFooter>
    </Card>
    </>
  )
}

export default PostCard;