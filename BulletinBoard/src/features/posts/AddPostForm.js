import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { postAdded } from './postsSlice'
import { selectAllUsers } from '../users/userSlice'

const AddPostForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const users = useSelector(selectAllUsers)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId))
      setTitle('')
      setContent('')
    }
  }

  // Check if all title, content and userId are true
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const userOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add New Post</h2>
      <form>
        <label htmlFor='postTitle'>Post Title:</label>
        <input
          title='text'
          id='postTitle'
          name='postName'
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor='postAuthor'>Author:</label>
        <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
          <option value=''></option>
          {userOptions}
        </select>
        <label htmlFor='postContent'>Content:</label>
        <textarea
          id='postContent'
          name='postContent'
          value={content}
          onChange={onContentChanged}
        />
        <button disabled={!canSave} type='button' onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
