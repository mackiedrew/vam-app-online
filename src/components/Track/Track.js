import React, { Component, PropTypes } from 'react'
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
        <p className="name">{name}</p>
      </div>
    )
  }
}

// Define prop types
Track.propTypes = {
  id: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  close: PropTypes.func,
}

export default Track
