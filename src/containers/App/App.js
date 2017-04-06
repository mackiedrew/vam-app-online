import React, { Component } from 'react'

import './App.scss'
import Tracks from '../../components/Tracks/Tracks'

class App extends Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1>VAM Editor</h1>
        </header>
        <main>
          <Tracks />
          {/* Load Tracks */}
        </main>
        <footer>
          <span><em>Developed for Valence Audio</em></span>
        </footer>
      </div>
    )
  }
}

export default App