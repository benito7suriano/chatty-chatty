import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import axios from 'axios'

// initial state
const initialState = {
  messages: [],
  userInput: ''
}

// action types
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'
const WRITING_MESSAGE = 'WRITING_MESSAGE'
const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE'
// const GOT_CHANNELS_FROM_SERVER = 'GOT_CHANNELS_FROM_SERVER'

// action creators
export const gotMessagesFromServer = (messages) => ({type: GOT_MESSAGES_FROM_SERVER, messages})
export const writingMessage = (input) => ({type: WRITING_MESSAGE, input})
export const receivedNewMessage = (message) => ({type: RECEIVED_NEW_MESSAGE, message})
// export const gotChannelsFromServer = channels => ({type: GOT_CHANNELS_FROM_SERVER, channels})

// thunk creators
export const fetchMessages = () => async (dispatch) => {
  const response = await axios.get('/api/messages')
  const messages = response.data

  const action = gotMessagesFromServer(messages)
  dispatch(action)
}

export const postNewMessage = newMessage => async dispatch => {
  const { data } = await axios.post('/api/messages',newMessage)
  const action = receivedNewMessage(data)

  dispatch(action)
}

// export const fetchChannels = () => async dispatch => {
//   const { data } = await axios.get('/api/channels')
//   const action = gotChannelsFromServer(data)
//   dispatch(action)
// }

// reducer
const reducer = (state=initialState, action) => {
  switch(action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return {...state, messages: action.messages }
    case WRITING_MESSAGE:
      return {...state, userInput: action.input}
    case RECEIVED_NEW_MESSAGE:
      return {...state, messages: [...state.messages,action.message]}
    default:
      return state
  }
}

// store
const store = createStore(reducer, applyMiddleware(logger, thunk))
export default store
