import React, { Component } from 'react'

import styles from './style.scss'

class SongSelector extends Component {

  constructor(props) {
    super(props)
    this.onHandleKeyUp.bind(this)
    this.getStreamUrl.bind(this)
  }

  onHandleKeyUp(e) {
    if (e.key === "Enter") {
      this.getStreamUrl(e.target.value)
    }
  }

  getStreamUrl(soundCloudUrl) {
    let url = `${process.env.API_URL}/resolve?url=${soundCloudUrl}&client_id=${process.env.CLIENT_ID}`
    var request = new XMLHttpRequest()
    let self = this

    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
          let resp = JSON.parse(request.responseText)
          if (resp.streamable && resp.stream_url != "") {
            self.props.onChangeSong(`${resp.stream_url}?client_id=${process.env.CLIENT_ID}`)
          }
      }
    }
    request.open('GET', url, true)
    request.send()
  }

  render() {
    const { props } = this
    return (
      <div className={styles.songSelector}>
        <input type="text" onKeyUp={this.onHandleKeyUp.bind(this)} placeholder="Soundcloud song url" />
      </div>
    )
  }
}

export default SongSelector
