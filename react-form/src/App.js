import './App.css'
import React, { useState } from 'react'
import Title from './components/Title'
import Modal from './components/Modal'
import EventList from './components/EventList'
import NewEventForm from './components/NewEventForm'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [showEvents, setShowEvents] = useState(true)
  const [events, setEvents] = useState([])

  const handleClick = (id) => {
    setEvents(prevEvents => {
      return prevEvents.filter(event => id !== event.id)
    })
  }

  // this function takes in as an areguemnt an event object
  // and that will be the new event that we want to add to this state
// Prev events is the current state
  const addEvent = (event) => {
    setEvents((prevEvents) => {
      return [...prevEvents, event]
    })
    setShowModal(false)
  }
// Returns a new array, where we take the previous 
// and spreads them into the new array and also adds the new event as well

  const subtitle = "For keeping notes of events"

  return (
    <div className="App">
      <Title title="Event Pad" subtitle={subtitle} />
      
      {showEvents && (
        <div>
          <button onClick={() => setShowEvents(false)}>Hide</button>
        </div>
      )}
      {!showEvents && (
        <div>
          <button onClick={() => setShowEvents(true)}>Show</button>
        </div>
      )}
      {showEvents && <EventList events={events} handleClick={handleClick} />}
      
      {showModal && <Modal isSalesModal={true}>
          <NewEventForm addEvent={addEvent}/>
        </Modal>}

      <div>
        <button onClick={() => setShowModal(true)}>Add New Event</button>
      </div>
    </div>
  );
}

export default App;
