import React, { Component } from 'react'

import styles from './style.scss'
import EnergizedParticles from '../EnergizedParticles'

class Vizualizer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <EnergizedParticles analyser={this.props.analyser} />
  }
}
export default Vizualizer
