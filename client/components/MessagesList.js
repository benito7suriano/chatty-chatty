import React, { Component } from 'react'
import { connect } from 'react-redux'
import Message from './Message'
import NewMessageEntry from './NewMessageEntry'
import axios from 'axios'
import { fetchMessages } from '../store'

const mapState = state => ({
  messages: state.messages
})

const mapDispatch = (dispatch) => ({
  fetchInitialMessages: () => dispatch(fetchMessages())
})

class MessagesList extends Component {

  constructor (props) {
    super(props)
    this.state = this.props.state
  }

  componentDidMount () {
    this.props.fetchInitialMessages()
  }

  render () {
    const channelId = Number(this.props.match.params.channelId) // because it's a string "1", not a number!
    const messages = this.state.messages
    const filteredMessages = messages.filter(message => message.channelId === channelId)

    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <NewMessageEntry />
      </div>
    )
  }
}

const ConnectedMessagesList = connect(mapState, mapDispatch)(MessagesList)

export default ConnectedMessagesList
