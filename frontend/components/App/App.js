import React, { Component } from 'react'

import Tracks from '../Tracks/Tracks'

class App extends Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div className="app">
        <header>
          VAM Online
          <nav>
            <a href="./">Home</a>
          </nav>
        </header>
        <main>
          <Tracks />
          {/* Tracks List */}
          {/* Load Tracks */}
        </main>
        <footer>
          Developed for Valence Audio
        </footer>
      </div>
    )
  }
}

export default App