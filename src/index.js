import React from 'react'
import {render} from 'react-dom'

// Add base.scss 
import styles from './styles/base.scss'

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
