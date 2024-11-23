import React, { useState } from 'react'

const Events = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      collegeName: 'SRM',
      eventName: 'Symposium',
      Link: 'https://srm.in/cse/symposium'
    }, {
      id: 2,
      collegeName: 'VIT',
      eventName: 'Hackathon',
      Link: 'https://vit.ac.in/ad/hackathon'
    }
  ])

  return (
    <div>
        <div className="event-container">
          {events && events.map(event => (<div className="events" key={event.id}>
            <h2>College: {event.collegeName}</h2>
            <p><b>Event: </b>{event.eventName}</p>
            <p><b>Link: </b>{event.Link}</p>
            <span></span>
          </div>))}
        </div>
    </div>
  )
}

export default Events