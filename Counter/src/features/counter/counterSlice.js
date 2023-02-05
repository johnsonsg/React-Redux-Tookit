// Note: Slice: splitting up redux state objects into multiple slices of state. Basicaly a collection of reducer logic and actions for a single feature in the app. Basically it's a reducer.

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Where we name all our actions. Just like the useReducer Hook built into react.
    increment: state => {
      state.count += 1
    },
    decrement: state => {
      state.count -= 1
    },
    reset: state => {
      state.count = 0
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload
    }
  }
})

// Now destructure thos actions (increment, decrement) from our counterSlice.actions
export const { increment, decrement, reset, incrementByAmount } =
  counterSlice.actions

export default counterSlice.reducer // this is the full reducer
