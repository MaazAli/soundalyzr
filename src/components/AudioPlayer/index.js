import React, { Component } from 'react'
import Mousetrap from 'mousetrap'

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      isMuted: false
    }
    this.onAnalyserSet.bind(this)
    this.setupAudio.bind(this)
  }

  componentDidMount() {
    this.setupAudio(this.props.streamUrl)

    // Keyboard shortcuts
    Mousetrap.bind(['space'], this.togglePlay.bind(this))
    Mousetrap.bind(['m'], this.toggleMute.bind(this))
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

        self.gainNode = context.createGain()

        self.source.connect(self.analyser)
        self.source.connect(self.gainNode)
        self.gainNode.connect(context.destination)
        self.source.start(0)

        self.setState({isPlaying: true})

        // For some reason context becomes an empty object right after we call
        // self.onAnalyserSet, so we'll just copy it to audioCtx right before :)
        self.audioCtx = context
        self.onAnalyserSet(self.analyser)

      }, this.onStreamError)
    }
    request.send()
  }

  onStreamError() {
    console.log("Error occurred")
  }

  togglePlay() {
    if (!this.audioCtx) {
      return
    }
    if (this.state.isPlaying) {
      this.audioCtx.suspend()
      this.setState({isPlaying: false})
    } else {
      this.audioCtx.resume()
      this.setState({isPlaying: true})
    }
  }

  toggleMute() {
    if (!this.gainNode) {
      return
    }

    if (this.state.isMuted) {
      this.setState({isMuted: false})
      this.gainNode.gain.value = 1
    } else {
      this.setState({isMuted: true})
      this.gainNode.gain.value = 0
    }
  }

  onAnalyserSet(analyser) {
    this.props.onAnalyserChange(analyser)
  }
  render() {
    return <div/>
  }
}
