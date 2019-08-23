import React, { Component } from 'react'
import Message from './Message'
import NewMessageEntry from './NewMessageEntry'
import { connect } from 'react-redux'
import { fetchMessages } from '../store'

const mapState = state => ({
  messages: state.messages
})

const mapDispatch = (dispatch) => ({
  fetchInitialMessages: () => dispatch(fetchMessages())
})

class MessagesList extends Component {

  constructor () {
    super()
    this.state = {messages: []}
  }

  componentDidMount () {
    this.props.fetchInitialMessages()
    this.setState({
      messages: this.props.messages
    })
  }

  render () {
    const channelId = Number(this.props.match.params.channelId) // because it's a string "1", not a number!
    const messages = this.props.messages
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

export default connect(mapState, mapDispatch)(MessagesList)
