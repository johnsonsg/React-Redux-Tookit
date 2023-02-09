import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { fetchPosts } from './features/posts/postsSlice'
import { fetchUsers } from './features/users/userSlice'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

store.dispatch(fetchUsers())
store.dispatch(fetchPosts())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </Router>
  </Provider>
)
