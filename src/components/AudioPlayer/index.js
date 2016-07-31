import React, { Component } from 'react'

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props)
    this.onAnalyserSet.bind(this)
  }

  componentDidMount() {
    this.setupAudio(this.props.streamUrl)
  }

  componentWillReceiveProps(nextProps) {
    // If the new streamUrl is different, start playing the new song
    if (this.props.streamUrl != nextProps.streamUrl) {
      this.setupAudio(nextProps.streamUrl)
    }
  }

  setupAudio(streamUrl) {
    window.AudioContext = window.AudioContext||window.webkitAudioContext
    let context = new AudioContext()
    var request = new XMLHttpRequest()
    request.open('GET', streamUrl, true)
    request.responseType = 'arraybuffer'

    let self = this

    // Decode asynchronously
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        // Stop any sound that's playing so we can load the new one
        if (self.source) {
          self.source.stop(0)
        }
        self.source = context.createBufferSource()
        self.source.buffer = buffer
        self.analyser = context.createAnalyser()
        self.analyser.smoothingTimeConstant = 0.5
        self.analyser.fftSize = 512
        self.soundData = new Uint8Array(self.analyser.frequencyBinCount)

        self.source.connect(self.analyser)
        self.source.connect(context.destination)
        self.source.start(0)
        self.onAnalyserSet(self.analyser)
      }, this.onStreamError)
    }
    request.send()
  }

  onStreamError() {
    console.log("Error occurred")
  }

  onAnalyserSet(analyser) {
    this.props.onAnalyserChange(analyser)
  }
  render() {
    return <div/>
  }
}
