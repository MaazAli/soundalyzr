import styles from './style.scss'

import React, { Component } from 'react'

import Vizualizer from '../Vizualizer'
import SongSelector from '../SongSelector'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      streamUrl: `${process.env.API_URL}/tracks/177683325/stream?client_id=${process.env.CLIENT_ID}`
    }
    this.onHandleSongChange.bind(this)
  }
  onHandleSongChange(newStreamUrl) {
    this.setState({streamUrl: newStreamUrl})
  }
  render() {
    const { streamUrl } = this.state
    return (
      <div className={styles.main}>
        <SongSelector onChangeSong={this.onHandleSongChange.bind(this)}/>
        <Vizualizer name="default" streamUrl={streamUrl} />
      </div>
    )
  }
}
