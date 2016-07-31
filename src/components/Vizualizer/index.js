import React, { Component } from 'react'
import Paper from 'paper'

import styles from './style.scss'

class Vizualizer extends Component {
  constructor(props) {
    super(props)
    this.maxVal = 0
    this.soundData = new Uint8Array(this.props.analyser.frequencyBinCount)
  }

  componentDidMount() {
    var vizCanvas = document.getElementById('vizualizer-canvas')
    Paper.setup(vizCanvas)
    this.drawView()
    Paper.view.onResize = this.onResize.bind(this)
    Paper.view.onFrame = this.onFrame.bind(this)
  }

  drawView() {
    // The amount of circles we want to make:
    this.count = 256
    this.vector = new Paper.Point(5, 5)

    // Create a symbol, which we will use to place instances of later:
    let path = new Paper.Path.Circle({
    	center: [0, 0],
    	radius: 5,
    	fillColor: 'white',
      opacity: 1
    })
    let symbol = new Paper.Symbol(path)

    // Place the instances of the symbol:
    for (let i = 0; i < this.count; i++) {
    	// The center position is a random point in the view:
    	let center = Paper.Point.random().multiply(Paper.view.size)
    	let placedSymbol = symbol.place(center)
    }
  }

  onResize(event) {
    // Remove the children and redraw view on resize!
    Paper.project.activeLayer.removeChildren()
    this.drawView()
  }

  onFrame(event) {
    let { analyser } = this.props
    if (analyser) {
      analyser.getByteFrequencyData(this.soundData)
    }
    // Run through the active layer's children list and change
  	// the position of the placed symbols:
  	for (let i = 0; i < this.count; i++) {
  		let item = Paper.project.activeLayer.children[i]

      this.vector.length = 0

      if (analyser) {
        let oldVal = this.soundData[i]
        let oldRange = (255 - 0)
        let newRange = (10 - 0)
        let newVal = (((oldVal) * newRange) / oldRange)

        let newOpacity = (((this.soundData[i]) * 1) / 255)
        let newScale  = (newVal / item.bounds.height) * item.bounds.height > 5 ? newVal / item.bounds.height : (5/item.bounds.height)

        item.opacity = newOpacity
        item.scale(newScale)
        item.position.y += (10 - newVal) / 5

        if (item.bounds.bottom > Paper.view.size.height) {
          item.position.y = -item.bounds.height;
        }
        // this.vector.angle = this.getRandomDegree()

        // if (i > 200) {
        //   this.vector.length = newVal > 0 ? newVal + 5 : 0
        // } else if (i > 150 && i <= 200) {
        //   this.vector.length = (newVal - 1) > 0 ? newVal - 1 : 0
        // } else if (i > 100 && i <= 150) {
        //   this.vector.length = (newVal - 2) > 0 ? newVal - 2 : 0
        // } else {
        //   this.vector.length = (newVal - 5) > 0 ? newVal - 5 : 0
        // }
      }

      item.position = item.position.add(this.vector)
  	}
  }

  getRandomDegree() {
    return Math.random() * (360 - 1) + 1
  }

  render() {
    return (
      <div>
        <canvas id="vizualizer-canvas" data-paper-resize/>
      </div>
    )
  }
}
export default Vizualizer
