import { createSlice } from "@reduxjs/toolkit";
import $api from "../../api/index"
const initialState = {
    // fetch data here
    events: [
    {
        id:1,
        title: "Gathering in our new BIG BUILDING",
        date: new Date('2015-06-12T13:50:12Z'),
        organizer: "Big D Company",
        location: "Donetsk/48.016140605590536N37.800105003025614",
        ticketPrice: 300,
        ticketAmount: 123,
        theme: 'buisness',
        format: 'meeting',
        poster: "cardMedia.jpg"
    },
    {
        id:2,
        title: "Celebrate with us",
        date: new Date('2022-05-12T13:50:12Z'),
        organizer: "Big D Company",
        location: "Donetsk/48.016949201996106N37.807992299196535",
        ticketPrice: 200,
        ticketAmount: 23,
        theme: 'politics',
        format: 'meeting',
        poster: "cardMedia.jpg"
    },
    {
        id:3,
        title: "Test test programming",
        date: new Date('2022-01-03T11:11:12Z'),
        organizer: "pHuy",
        location: "Donetsk/47.987459214602275N37.79925704190732",
        ticketPrice: 1000,
        ticketAmount: 123,
        theme: 'programming',
        format: 'meeting',
        poster: "nnnoise.svg"
    },
    {
        id:4,
        title: "new ==== vebinar",
        date: new Date('2015-05-12T13:50:12Z'),
        organizer: "Damn",
        location: "Donetsk/48.001121098995114N37.82321959075798",
        ticketPrice: 99,
        ticketAmount: 20,
        theme: 'buisness',
        format: 'vebinar',
        // poster: "cardMedia.jpg"
    },
    {
        id:5,
        title: "just to make sure it's 5th",
        date: new Date('2011-03-11T12:30:12Z'),
        organizer: "Me",
        location: "Donetsk/48.00087357427656N37.80395161245578",
        ticketPrice: 19,
        ticketAmount: 10,
        theme: 'test',
        format: 'online',
        poster: "cardMedia.jpg"
    },
    ],

    inloc: [],
}
export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addEvent(state, action) {
            return [...state.events, action.payload]
        },
        deleteEvent(state, action) {
            return state.events.filter((event) => event.id !== action.payload)
        },
        modifyEvent(state, action) {
            state.events[action.payload.id] = action.payload
        },
        eventsLoaded(state, action) {
            return action.payload
        },
        updateLocalEvents(state, action) {
            // todo
            // for (let i = 0; i < action.payload.length; i++) {
            //     state.inloc = [...state.inloc, action.payload[i]]
            // }
        },
        addComment: (state, action) => {
            const {eventId, comment} = action.payload
            const updatedEvents = state.events.map(event => {
                if (event.id === eventId){
                    return {
                        ...event,
                        comments: [...event.comments, comment]
                    }
                }
                return event;
            })
            return {
                ...state,
                events: updatedEvents
            };
        }
    }
})

export async function fetchEvents(dispatch, getState) {
    const response = await $api.get('/events')
    dispatch(eventsLoaded(response.events))
}

export function saveNewEvent(data) {
  return async function saveNewEventThunk(dispatch, getState) {
    const initialEvent = { data }
    const response = await $api.post('/events', { event: initialEvent }) // get back the event to add to the store
    dispatch(addEvent(response.event))
  }
}

  export const {addEvent, deleteEvent, modifyEvent, eventsLoaded, updateLocalEvents, addComment} = eventsSlice.actions
  
  export default eventsSlice.reducer