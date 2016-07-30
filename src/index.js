import React from 'react'
import {render} from 'react-dom'

// Components
import Main from './components/Main'

class App extends React.Component {
  render () {
    return (
      <Main />
    )

  }
}

render(<App/>, document.getElementById('app'))
