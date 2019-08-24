import React, { Component } from 'react'
import { writingMessage, postNewMessage } from '../store'
import { connect } from 'react-redux'

const mapState = state => ({
  newMessageEntry: state.userInput
})

const mapDispatch = dispatch => ({
  write: string => dispatch(writingMessage(string)),
  post: message => dispatch(postNewMessage(message))
})

class NewMessageEntry extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()

    // our message content is on our state, which we're getting from our Redux store
    const content = this.props.newMessageEntry

    // our channelId is available from the props sent by MessagesList, which it receives as props from the Route!
    const channelId = this.props.channelId

    this.props.post({ content, channelId })
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something stupid..."
            value={this.props.newMessageEntry}
            onChange={(evt) => this.props.write(evt.target.value)}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    )
  }
}

export default connect(mapState, mapDispatch)(NewMessageEntry)
