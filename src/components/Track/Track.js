import React, { Component } from 'react'
import './Track.styl'

class Track extends Component {

  constructor(props) {
    super(props)
    this.initialState = {
      name: props.file,
      length: undefined, // Samples
      grains: [],
    }
    this.state = this.initialState
  }

  render() {

    const { name } = this.state
    const { id, close } = this.props

    return (
      <div className="track">
        <button className="close" onClick={() => close(id)}>X</button>
        <span className="name">{name}</span>
      </div>
    )
  }
}

export default Track
