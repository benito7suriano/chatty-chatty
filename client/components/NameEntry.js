import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writingUser } from '../store'

const mapDispatch = dispatch => ({
  writingUser: username => dispatch(writingUser(username))
})

class NameEntry extends Component {
  render() {
    return (
      <form className="form-inline">
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          onChange={evt => this.props.writingUser(evt.target.value)}
        />
      </form>
    )
  }
}

export default connect(null, mapDispatch)(NameEntry)
