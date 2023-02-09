import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = []

// create async thunk
// dispatch fetchUsers AsyncThunk in the index.js file, because
// we want to load the users right when the app starts.
export const fetchUsers = createAsyncThunk('posts/fetchUsers', async () => {
  const response = await axios.get(USERS_URL)
  return response.data
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const selectAllUsers = state => state.users

export const selectUserById = (state, userId) =>
  state.users.find(user => user.id === userId)

export default userSlice.reducer
