import React, { Component } from 'react'

import styles from './style.scss'
import EnergizedParticles from '../EnergizedParticles'

class Visualizer extends Component {
  constructor(props) {
    super(props)
    this.vizMap = {
      "default": <EnergizedParticles analyser={this.props.analyser} />,
      "EnergizedParticles": <EnergizedParticles analyser={this.props.analyser} />
    }
  }

  render() {
    const {visualizationName, analyser} = this.props
    const $visualization = this.vizMap[visualizationName || "default"]
    return (
      <div>
        {$visualization}
      </div>
    )
  }
}
export default Visualizer