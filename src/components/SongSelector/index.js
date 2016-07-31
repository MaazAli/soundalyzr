import React, { Component } from 'react'

import styles from './style.scss'

class SongSelector extends Component {

  constructor(props) {
    super(props)
    this.onHandleKeyUp.bind(this)
    this.getSong.bind(this)
  }

  componentWillMount() {
    if (this.props.songUrl) {
      this.getSong(this.props.songUrl)
    }
  }

  onHandleKeyUp(e) {
    if (e.key === "Enter") {
      this.getSong(e.target.value)
    }
  }

  getSong(soundCloudUrl) {
    let url = `${process.env.API_URL}/resolve?url=${soundCloudUrl}&client_id=${process.env.CLIENT_ID}`
    var request = new XMLHttpRequest()
    let self = this

    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
          let resp = JSON.parse(request.responseText)
          if (resp.streamable && resp.stream_url != "") {
            self.props.onChangeSong(resp)
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
