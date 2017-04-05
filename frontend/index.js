import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App/App'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

// Hot Module Replacement
if (module.hot) {
  console.log('test3')
  module.hot.accept('./components/App/App', () => {
    console.log('test2')
    render(App)
  })
}