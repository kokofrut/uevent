import React, { useState, useEffect } from 'react'
import "./allEvents.scss"
import Event from "../event/Event"
import LoadingView from '../../../common/loadingView/loadingView'
import { useSelector, useDispatch } from 'react-redux'
import { updateLocalEvents } from '../../../../features/events/eventsSlice'
import axios from 'axios'
import $api from "../../../../api/index";
import { Pagination } from '@mui/material'


function AllEvents() {
	const location = useSelector((state) => state.search.value)
	const [loading, setLoading] = useState(true)
	const [allEvents, setAllEvents] = useState([])
	const dispatch = useDispatch()
	let events = useSelector((state) => state.events.events)

	const [page, setPage] = React.useState(1);

	const [eventsinloc, setEventsInLoc] = useState([])
	function handleSort(event) {
		const targetvalue = event.target.selectedOptions[0].value
		if (targetvalue === "date") {
			const sortedEvents = eventsinloc.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
			setEventsInLoc(sortedEvents)
		}
		if (targetvalue === "price") {
			const sortedEvents = eventsinloc.slice().sort((a, b) => a.ticketPrice - b.ticketPrice)
			setEventsInLoc(sortedEvents)
		}
	}

	useEffect(() => {
		events = events.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
		setLoading(false)
	}, [events])
	useEffect(() => {
		async function fetchData() {
			try {
				await $api.get(`/events`).then((response) => response.json).then((data) => setAllEvents(data))
			}
			catch (error) {
				console.error(error)
			}
		}
		fetchData()
	}, [])
	useEffect(() => {
		setEventsInLoc(events.filter(event => event.location.split("/")[0] === location))
	}, [location])

	const pageLimit = 6;
	const offset = (page - 1) * pageLimit;
	const eventsOnPage = eventsinloc.slice(offset, offset + pageLimit);

	return (
		<>
			{loading ? <div><LoadingView /></div> :
				<>

					<div className="allEvents-wrapper">
						<div className="fb-wrapper">
							<p className="fb-text">Sort by</p>
							<select className="fb-select" onChange={(e) => handleSort(e)}>
								<option value="date">Date</option>
								<option value="price">Price</option>
							</select>
							<p className="fb-text">Filter by</p>
							<select className="fb-select" onChange={(e) => handleSort(e)}>
								<option value="theme">Theme</option>
								<option value="format">Format</option>
							</select>
						</div>
						<div className="city-label">AllEvents in {location}</div>
						<div className="allEvents-card-wrapper">
							{eventsOnPage !== undefined && eventsOnPage.length > 0 &&
								eventsOnPage.map((event, i) => (<Event eventData={event} events={events} key={event.id} />))}
						</div>
					</div>
					<div className="pagination-wrapper">
						<Pagination  count={Math.ceil(eventsinloc.length / pageLimit)} page={page} showFirstButton showLastButton onChange={(event, value) => setPage(value)} />
					</div>
				</>
			}

		</>
	)
}

export default AllEvents