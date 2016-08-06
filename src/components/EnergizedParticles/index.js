import React, { Component } from 'react'
import Paper from 'paper'

import styles from './style.scss'

class EnergizedParticles extends Component {
  constructor(props) {
    super(props)
    this.maxVal = 0
    this.particleCount = this.props.particleCount || 256
    this.vector = new Paper.Point(5,5)
    this.particleRadius = 5
    this.minRadius = 5
    this.soundData = new Uint8Array(this.props.analyser.frequencyBinCount)
    this.direction = []

    this.drawView.bind(this)
    this.bounceItemIfNeeded.bind(this)
  }

  componentDidMount() {
    let canvas = document.getElementById('energized-particles-canvas')
    Paper.setup(canvas)
    this.drawView()
    Paper.view.onResize = this.onResize.bind(this)
    Paper.view.onFrame = this.onFrame.bind(this)
  }

  drawView() {
    // Create a symbol, which we will use to place instances of later:
    let path = new Paper.Path.Circle({
    	center: [0, 0],
    	radius: this.particleRadius,
    	fillColor: 'white',
      opacity: 1
    })
    let symbol = new Paper.Symbol(path)

    // Place the instances of the symbol:
    for (let i = 0; i < this.particleCount; i++) {
    	// The center position is a random point in the view:
    	let center = Paper.Point.random().multiply(Paper.view.size)
    	let placedSymbol = symbol.place(center)
      this.direction.push(this.getRandomDegree())
    }
  }

  onResize(event) {
    // Remove the children and redraw view on resize!
    Paper.project.activeLayer.removeChildren()
    this.drawView()
  }

  onFrame(event) {
    let { analyser } = this.props
    analyser.getByteFrequencyData(this.soundData)
    // Run through the active layer's children list and change
  	// the position of the placed symbols:
  	for (let i = 0; i < this.particleCount; i++) {
  		let item = Paper.project.activeLayer.children[i]

      this.vector.angle = this.direction[i]

      let freqVal = this.soundData[i]
      let zeroTo20 = this.freqToRange(freqVal, 20)
      let zeroTo10 = this.freqToRange(freqVal, 10)
      let zeroTo5 = this.freqToRange(freqVal, 5)
      let zeroTo1 = this.freqToRange(freqVal, 1)
      let zeroToHalf = this.freqToRange(freqVal, 0.5)

      let newOpacity = zeroToHalf
      let newScale = (zeroTo20 / item.bounds.height)

      if (i > 200) {
        // Low Frequency
        newScale = (zeroTo20 * 2 / item.bounds.height)
        newOpacity = newOpacity == 0 ? 0 : newOpacity + 0.3
      } else if (i > 150 && i <= 200) {
        newScale = (zeroTo20 * 1.2 / item.bounds.height)
      } else if (i > 100 && i <= 150) {
      }

      if (newScale * item.bounds.height < this.minRadius) {
        newScale = (5/item.bounds.height)
      }

      item.opacity = newOpacity
      item.scale(newScale)
      item.position.y += zeroTo5

      this.bounceItemIfNeeded(item, i)
  	}
  }

  bounceItemIfNeeded(item, index) {
    // let rightWall = item.bounds.right > Paper.view.size.width
    // let leftWall = item.bounds.left < 0
    // let topWall = item.bounds.top < 0
    // let bottomWall = item.bounds.bottom > Paper.view.size.height
    // if (rightWall || leftWall || topWall || bottomWall) {
    //   this.direction[index] = this.direction[index] + 90
    // }

    if (item.bounds.top > Paper.view.size.height) {
			item.position.y = -item.bounds.height
		}
  }

  getRandomDegree() {
    return Math.random() * (360 - 1) + 1
  }

  freqToRange(freqVal, newRange) {
    return ((freqVal) * newRange) / (this.particleCount - 1)
  }

  render() {
    return (
      <div className={styles.energizedParticles}>
        <canvas id="energized-particles-canvas" data-paper-resize/>
      </div>
    )
  }
}
export default EnergizedParticles
