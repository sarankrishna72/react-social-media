import React, { useEffect, useState } from 'react'
import CreatePost from '../create-post/CreatePost';
import PostCard from '../post-card/PostCard';
import './Feed.scss';
import coreAPIs from '../../core/api/CoreApi';
import useToast from '../../hooks/useToast';


const Feed = ({posts = []}) => {
  const [postData, setPostData] = useState(posts);
  const toast = useToast();
  useEffect(( )=> {
    setPostData(posts.sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()));

  },[posts, posts.length])

  const createPost = (event) => {
    coreAPIs.postsApi().post(event).then((result) => {
      toast({
        toastType: 'success',
        title: 'Post Creation',
        description: 'Successfully created post...',
        configuration: {
            toast_postion: 'top-right'
        }
      })
      setPostData(prevArray => [ ...[result.data], ...prevArray])
    }).catch((err) => {
      toast({
        toastType: 'error',
        title: 'Post Creation',
        description: 'Post creation failed...',
        configuration: {
            toast_postion: 'top-right'
        }
    })
    });
  }

  return (
   <>
   <div className='section-760-px'>
      <CreatePost createPost={createPost} />
      {
        postData?.map((post) => {
          return <PostCard post={post} key={post._id} />
        })
      }
      
   </div>
   </>
  )
}

export default Feed