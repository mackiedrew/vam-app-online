import React, { Component } from 'react'
import './App.scss'
import Tracks from '../Tracks/Tracks'

class App extends Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div className="app">
        <header>
          VAM Editor
          <nav>
            <a href="./">Home</a>
          </nav>
        </header>
        <main>
          <Tracks />
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