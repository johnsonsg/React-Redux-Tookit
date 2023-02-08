import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAllPosts,
  getPostStatus,
  getPostError,
  fetchPosts
} from './postsSlice'
import PostsExcerpt from './PostsExcerpt'

const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostStatus)
  const error = useSelector(getPostError)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === 'loading') {
    content = <p>Loading...</p>
  } else if (postStatus === 'succeeded') {
    // prettier-ignore
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    // prettier-ignore
    content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>
  }

  return <section>{content}</section>
}

export default PostsList
