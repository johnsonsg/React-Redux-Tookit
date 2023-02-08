import React from 'react'
import PostsList from './features/posts/PostsList'
import AddPostForm from './features/posts/AddPostForm'
import './App.css'

export default function App() {
  return (
    <main className='App'>
      <AddPostForm />
      <PostsList />
    </main>
  )
}
