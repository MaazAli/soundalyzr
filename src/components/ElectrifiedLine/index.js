import React, { Component } from 'react'
import Paper from 'paper'

import styles from './style.scss'

class ElectrifiedLine extends Component {
  constructor(props) {
    super(props)

    this.segmentCount = this.props.analyser.frequencyBinCount
    this.maxHeight = this.props.analyser.frequencyBinCount
    this.soundData = new Float32Array(this.props.analyser.frequencyBinCount)

    this.drawView.bind(this)
  }

  componentDidMount() {
    let canvas = document.getElementById('electrified-line-canvas')
    Paper.setup(canvas)
    this.drawView()
    Paper.view.onResize = this.onResize.bind(this)
    Paper.view.onFrame = this.onFrame.bind(this)
  }

  drawView() {
    this.path = new Paper.Path({
    	strokeColor: [0.8],
    	strokeWidth: 2,
    	strokeCap: 'square'
    })

    // Add this.segmentCount segment points to the path spread out
    for (let i = 0; i <= this.segmentCount; i++) {
    	this.path.add(new Paper.Point((Paper.view.size.width/this.segmentCount) * i, 1))
    }

    this.path.selected = true
  }

  onResize(event) {
    this.drawView()
  }

  onFrame(event) {
    let { analyser } = this.props
    analyser.getFloatFrequencyData(this.soundData)
    // Run through the active layer's children list and change
  	// the position of the placed symbols:

    // Loop through the segments of the path:
  	for (let i = 0; i <= this.segmentCount; i++) {
  		let segment = this.path.segments[i]
  		// Change the y position of the segment point:
  		segment.point.y = (Paper.view.size.height / 2) - this.freqToRange(this.soundData[i], this.maxHeight)
  	}
    this.path.smooth()
  }

  getRandomDegree() {
    return Math.random() * (360 - 1) + 1
  }

  freqToRange(freqVal, newRange) {
    return ((freqVal) * newRange) / (this.segmentCount - 1)
  }

  render() {
    return (
      <div className={styles.electrifiedLine}>
        <canvas id="electrified-line-canvas" data-paper-resize/>
      </div>
    )
  }
}
export default ElectrifiedLine
