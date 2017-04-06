import React, { Component } from 'react'
import { remote } from 'electron'
import fs from 'fs'
import wav from 'wav'

import './App.scss'
import Tracks from '../../components/Tracks/Tracks'

const showFileDialog = remote.dialog.showOpenDialog

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
          <button onClick={() => showFileDialog({
            title: 'Select Show Tracks',
            filters: [
              {
                name: 'Track Files (.wav)',
                extensions: ['wav'],                
              },
            ],
            properties: [
              'openFile',
              'multiSelections',
            ]
          }, (files) => {
            files.map((file) => {
              console.log(file)
            })
          })}
          >Select Tracks</button>
        </main>
        <footer>
          <span><em>Developed for Valence Audio</em></span>
        </footer>
      </div>
    )
  }
}

export default App