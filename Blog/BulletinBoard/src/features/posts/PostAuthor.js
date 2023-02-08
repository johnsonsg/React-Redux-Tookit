import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/userSlice'

// Because we are not importing postsSlice.js; we destructure and pass in the userId prop that we made from the PostsList.js ( <PostAuthor userId={post.userId} />)
const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers)
  const author = users.find(user => user.id === userId)

  return <span>by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor
