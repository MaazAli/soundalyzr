import React, { Component } from 'react'
import QueryString from 'query-string'

import styles from './style.scss'

import Visualizer from '../Visualizer'
import SongSelector from '../SongSelector'
import AudioPlayer from '../AudioPlayer'

export default class Main extends Component {
  constructor(props) {
    super(props)

    const qs = QueryString.parse(window.location.search)

    this.state = {
      defaultSongUrl: qs.url || "https://soundcloud.com/blvksheepmusic/alesso-hereos-blvk-sheep-trap-remix",
      songRecord: null,
      analyser: null
    }
    this.onHandleSongChange.bind(this)
  }
  onHandleSongChange(songRecord) {
    this.updateQueryString(songRecord.permalink_url)
    this.setState({songRecord: songRecord})
  }
  onAnalyserChange(analyser) {
    this.setState({analyser: analyser})
  }
  updateQueryString(url) {
    const { protocol, host, pathname } = window.location
    let newUrl = `${protocol}//${host}${pathname}?${QueryString.stringify({url: url})}`
    window.history.pushState({path:newUrl},'',newUrl)
  }
  render() {
    const { defaultSongUrl, analyser, songRecord } = this.state

    let $visualizer = ""
    let $audioPlayer = ""
    if (analyser) {
      $visualizer = <Visualizer visualizationName="default" analyser={analyser}/>
    }

    if (songRecord) {
      $audioPlayer = <AudioPlayer songRecord={songRecord} onAnalyserChange={this.onAnalyserChange.bind(this)} />
    }

    return (
      <div className={styles.main}>
        <SongSelector songUrl={defaultSongUrl} onChangeSong={this.onHandleSongChange.bind(this)} />
        {$audioPlayer}
        {$visualizer}
      </div>
    )
  }
}
