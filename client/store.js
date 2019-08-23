import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

// initial state
const initialState = { messages: [] }

// action types
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'

// action creators
export const gotMessagesFromServer = (messages) => ({type: GOT_MESSAGES_FROM_SERVER, messages})

// thunk creators
export const fetchMessages = () => async (dispatch) => {
  console.log('Dispatched thunk')
  const response = await axios.get('/api/messages')
  const messages = response.data
  const action = gotMessagesFromServer(messages)
  dispatch(action)
}

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
const store = createStore(reducer, applyMiddleware(thunk))
export default store
