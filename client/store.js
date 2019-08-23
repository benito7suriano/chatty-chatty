import { createStore } from 'redux'

// initial state
const initialState = { messages: [] }

// action types
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'

// action creators
export const gotMessagesFromServer = (messages) => ({type: GOT_MESSAGES_FROM_SERVER, messages})

// reducer
const reducer = (state=initialState, action) => {
  switch(action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return {...state, messages: action.messages }
    default:
      return state
  }
}

// store
const store = createStore(reducer)
export default store
