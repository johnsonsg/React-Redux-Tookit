import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'

const PostsExcerpt = ({ post }) => {
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
export default PostsExcerpt

// post.content.substring
// the api delivers the content in the 'body' so we have to change
// this to post.body.substring
