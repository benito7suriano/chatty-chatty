import React, { Component } from 'react'
import { writingMessage } from '../store'
import { connect } from 'react-redux'

const mapState = state => ({
  newMessageEntry: state.userInput
})

const mapDispatch = dispatch => ({
  write: string => dispatch(writingMessage(string))
})

class NewMessageEntry extends Component {
  render () {
    return (
      <form id="new-message-form">
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something stupid..."
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
