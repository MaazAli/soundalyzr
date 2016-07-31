import React, { Component } from 'react'
import styles from './style.scss'

export default class Main extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { record } = this.props

    return (
      <div className={styles.songCard}>
        <div className={styles.image}>
          <img src={record.artwork_url || record.user.avatar_url} />
        </div>
        <div className={styles.mainContent}>
          {record.title}
          {record.user.username}
        </div>
      </div>
    )
  }
}
