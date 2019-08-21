

// initial state
const initialState = { messages: [] }

// action types
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'

// action creators
export const gotMessagesFromServer = (messages) => ({type: GOT_MESSAGES_FROM_SERVER, messages})

// reducer

