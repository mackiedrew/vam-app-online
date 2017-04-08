import React from 'react'

import './App.styl'
import Tracks from '../../components/Tracks/Tracks'

const App = () =>
  <div className="app">
    <header>
      <h1>VAM Editor</h1>
    </header>
    <main>
      <Tracks />
    </main>
    <footer>
      <span>Developed for Valence Audio</span>
    </footer>
  </div>

export default App