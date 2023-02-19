// Notes:
// state.push - This is mutating state using immer.js. This is built under the hood in React.
// immer (German for: always) is a tiny package that allows you to work with immutable state in a more convenient way.
// payload is the form data that we send / dispatch our post add

import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0
})

// create async thunk - fetch Posts
// prettier-ignore
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try{
    const response = await axios.get(POSTS_URL)
    return response.data
  } catch (err) {
    return err.message
  }
})

// create async thunk - add Posts
// prettier-ignore
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  try {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
  } catch (err) {
    return err.messge
  }
})

// create async thunk - update Posts
// prettier-ignore
export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
  const { id } = initialPost // destructure and get id from post data
  try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
      return response.data
  } catch (err) {
      return err.message
      // return initialPost; // only for testing Redux!
  }
})

// create async thunk - delete Posts
// prettier-ignore
export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
  const { id } = initialPost // destructure and get id from post data
  try {
      const response = await axios.delete(`${POSTS_URL}/${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`
  } catch (err) {
      return err.message
  }
})

// Anytime we add new data, this is the first place we need to think about.
// Reducers (slices)
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    increaseCount(state, action) {
      state.count = state.count + 1
    }
  },

  // Add more reducers using builder and .addCase
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Adding date and reactions
        let min = 1
        const loadedPosts = action.payload.map(post => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
          }
          return post
        })

        // Add any fetched posts to the array
        postsAdapter.upsertMany(state, loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // NOTE: Commented this out at 2:39:49
        // const sortedPosts = state.posts.sort((a, b) => {
        //   if (a.id > b.id) return 1
        //   if (a.id < b.id) return -1
        //   return 0
        // })
        // action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1
        // // End fix for fake API post IDs

        action.payload.userId = Number(action.payload.userId)
        action.payload.date = new Date().toISOString()
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
        }
        console.log(action.payload)
        postsAdapter.addOne(state, action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update could not complete')
          console.log(action.payload)
          return
        }
        action.payload.date = new Date().toISOString()
        postsAdapter.upsertOne(state, action.payload)
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Delete could not complete')
          console.log(action.payload)
          return
        }
        const { id } = action.payload
        postsAdapter.removeOne(state, id)
      })
  }
})

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts)

export const getPostsStatus = state => state.posts.status
export const getPostsError = state => state.posts.error
export const getCount = state => state.posts.count

// Create memoized to stop re-render on users post list page.
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.userId === userId)
)

export const { increaseCount, reactionAdded } = postSlice.actions

export default postSlice.reducer
