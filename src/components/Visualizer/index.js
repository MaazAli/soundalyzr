import React, { Component } from 'react'

import styles from './style.scss'
import EnergizedParticles from '../EnergizedParticles'
import ElectrifiedLine from '../ElectrifiedLine'

class Visualizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentViz: this.getDefaultViz()
    }
    this.createVizMap.bind(this)

    // Initialize visualization map
    this.createVizMap(this.props)
  }

  createVizMap(props) {
    this.vizMap = {
      "EnergizedParticles": <EnergizedParticles analyser={props.analyser} />,
      "ElectrifiedLine": <ElectrifiedLine analyser={props.analyser} />
    }
  }

  componentWillReceiveProps(nextProps) {
    // TODO: HACKY, will need to figure out how to inject the updated analyser
    // to all components in the map when it changes, instead of re-creating the whole thing
    // every time
    this.createVizMap(nextProps)
  }

  getDefaultViz() {
    return "EnergizedParticles"
  }

  onChangeViz(newViz) {
    console.log(newViz)
    this.setState({currentViz: newViz})
  }

  render() {
    const { currentViz } = this.state
    const $visualization = this.vizMap[currentViz]

    const curStyle = {
      borderBottom: "1px solid"
    }
    return (
      <div>
        <div className={styles.vizSelector}>
          <span style={currentViz === "EnergizedParticles" ? curStyle : {}} onClick={() => this.onChangeViz("EnergizedParticles")}>
            Energized Particles
          </span>
          <span style={currentViz === "ElectrifiedLine" ? curStyle : {}} onClick={() => this.onChangeViz("ElectrifiedLine")}>
            Electrified Line
          </span>
        </div>
        {$visualization}
      </div>
    )
  }
}
export default Visualizer
