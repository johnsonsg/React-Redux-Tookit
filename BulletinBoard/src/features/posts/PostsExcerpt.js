import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostsExcerpt = ({ post }) => {
  const shorten = post.body ? post.body.substring(0, 100) : ''
  return (
    <article>
      <h3>{post.title}</h3>
      <p>
        {
          //  post.body.substring(0, 100)
          shorten
        }
      </p>
      <p className='postCredit'>
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
