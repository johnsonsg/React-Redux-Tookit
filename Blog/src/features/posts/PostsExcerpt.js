import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

const PostsExcerpt = ({ postId }) => {
  const post = useSelector(state => selectPostById(state, postId))
  const shorten = post.body ? post.body.substring(0, 75) : ''

  return (
    <article>
      <h2>{post.title}</h2>
      <p className='excerpt'>{`${shorten} ...`}</p>
      <p className='postCredit'>
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

// export default .memo(PostsExcerpt)
export default PostsExcerpt // Initialize State Nomalization

// post.content.substring
// the api delivers the content in the 'body' so we have to change
// this to post.body.substring

// State Normalization:
// Normalization is a recommended approach for storying items.
// Though, there is nothing wrong with using Memo
// use normalize data over all elminates having to use Memo, which is still ok to use.
// - Recommended in docs
// - No Duplication of data
// - Creates an ID lookup
