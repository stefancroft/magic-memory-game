import React from 'react'
import styles from './EventList.module.css'

export default function EventList({ events, handleClick }) {
  return (
    <div>
      {events.map((event, index) => (
        <div className={styles.card} key={event.id}>
          <h2>{event.title}</h2>
          <span>{event.date}</span>
          <p>{event.location}</p>
          <br></br>
          <button onClick={() => handleClick(event.id)}>delete event</button>
        </div>
      ))}
    </div>
  )
}
