import { Button, Typography, Tooltip, Zoom } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { change } from '../../../../features/currEvent/currEventSlice.js'
import LoadingView from '../../../common/loadingView/LoadingView.jsx'
import "./event.scss"
function Event({ eventData, events }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const similarEvents = events.filter(event => event.theme !== eventData.theme)
  function handleTicket(e) {
    dispatch(change(eventData))
    localStorage.setItem('currEvent', JSON.stringify(eventData))
    console.log(eventData.title + '\n' + similarEvents)
    console.log(eventData.poster)
    navigate('event/' + eventData.id, { state: { similarEvents: similarEvents, eventData: eventData } }) // later delete it as it all will be done in EventPage
  }
  return (
    <div className="event-wrapper">
      {eventData !== undefined ?
        <div className="event-textarea">
          <div className="event-textarea-header">
            <p className="event-title">{eventData.title}</p>
          </div>
          <div className="event-tf">
            <Tooltip TransitionComponent={Zoom} title="Event theme">
              <div className="event-theme">{eventData.theme}</div>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title="Event format">
              <div className='event-format'>{eventData.format}</div>
            </Tooltip>
          </div>
          <div>
            {eventData.poster ?
              <img src={"/" + eventData.poster} className="event-image"></img> :
              <img src={"/no_photo.svg"} className="event-image"></img>
            }
          </div>
          {/* <p className="event-content">{eventData.content}</p> */}
          <div className="event-ticket-info">
            <div className="event-price">
              <Typography variant="h6" align="center">
                {eventData.ticketPrice}$
              </Typography>
            </div>
            <div className="event-amount">
              <Typography variant="h6" align="center">
                {eventData.ticketAmount} left
              </Typography>
            </div>
          </div>
          <div className="event-footer">
            <div>
              <p className="event-date">{new Date(eventData.date).toLocaleDateString('en-GB')}</p>
              <p className="event-time">
                {new Date(eventData.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="event-location">in {eventData.location.split('/')[0]}</p>
              <p className="event-author">{eventData.organizer}</p>
            </div>
            <div>
              <Button variant="text" color="info" size="small" onClick={(e) => handleTicket(e)}>show more</Button>
            </div>
          </div>
        </div> : <LoadingView />}
    </div>
  )
}

export default Event