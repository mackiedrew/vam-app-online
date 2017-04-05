import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App/App.js'

const render = Component => { // eslint-disable-line
  ReactDOM.render(
    <AppContainer>
      <App/>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

// Hot Module Replacement
if (module.hot) { // eslint-disable-line
  module.hot.accept( // eslint-disable-line
    './components/App/App',
    () => render(App)
  )
}