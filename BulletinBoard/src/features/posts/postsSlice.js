// Notes: ref line 26
// state.push - This is mutating state using immer.js. This is built under the hood in React.
// immer (German for: always) is a tiny package that allows you to work with immutable state in a more convenient way.
// payload is the form data that we send / dispatch our post add

import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit' // Generates a random id
import { sub } from 'date-fns'

const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    }
  },
  {
    id: '2',
    title: 'Slices...',
    content: 'The more I say slice, the more I want pizza.',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    }
  }
]

// Anytime we add new data, this is the first place we need to think about.
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          }
        }
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  }
})

export const selectAllPosts = state => state.posts
export const { postAdded, reactionAdded } = postSlice.actions
export default postSlice.reducer
