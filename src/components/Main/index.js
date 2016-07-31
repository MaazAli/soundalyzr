import styles from './style.scss'

import React, { Component } from 'react'

import Vizualizer from '../Vizualizer'
import SongSelector from '../SongSelector'
import AudioPlayer from '../AudioPlayer'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      streamUrl: `${process.env.API_URL}/tracks/177683325/stream?client_id=${process.env.CLIENT_ID}`,
      analyser: null
    }
    this.onHandleSongChange.bind(this)
  }
  onHandleSongChange(newStreamUrl) {
    this.setState({streamUrl: newStreamUrl})
  }
  onAnalyserChange(analyser) {
    this.setState({analyser: analyser})
  }
  render() {
    const { streamUrl, analyser } = this.state

    var $vizualizer = ""

    if (analyser) {
      $vizualizer = <Vizualizer name="default" analyser={analyser}/>
    }

    return (
      <div className={styles.main}>
        <SongSelector onChangeSong={this.onHandleSongChange.bind(this)} />
        <AudioPlayer streamUrl={streamUrl} onAnalyserChange={this.onAnalyserChange.bind(this)} />
        {$vizualizer}
      </div>
    )
  }
}
