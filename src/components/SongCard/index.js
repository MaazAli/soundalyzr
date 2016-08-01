import React, { Component } from 'react'
import styles from './style.scss'

export default class Main extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { record, isPlaying } = this.props
    let playIconText = "play_arrow"
    if (isPlaying) {
      playIconText = "pause"
    }

    return (
      <div className={styles.songCard}>
        <div className={styles.image}>
          <img src={record.artwork_url || record.user.avatar_url} />
          <i className="material-icons">{playIconText}</i>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.title}>{record.title}</div>
          <div className={styles.username}>{record.user.username}</div>
        </div>
      </div>
    )
  }
}
