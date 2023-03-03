
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Auth from './components/containers/auth/auth.jsx'
import './index.scss'
import { store } from './app/store'
import { Provider } from 'react-redux'
import Dashboard from './components/containers/dashboard/dashboard.jsx'
import EventPage from './components/containers/eventPage/eventPage.jsx'
import PaymentPage from './components/containers/payment/PaymentPage.jsx'

import LoadingView from './components/common/loadingView/LoadingView.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { fetchEvents } from './features/events/eventsSlice.js'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
    // fallback: smth
  },
  {
    path: 'auth',
    element: <Auth/>
  },
  {
    path: 'event/:id',
    element: <EventPage/>
  },
  {
    path: 'payment',
    element: <PaymentPage/>
  },
  {
    path: 'dashboard',
    element: <Dashboard/>
  }
]);
store.dispatch(fetchEvents)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={<LoadingView/>} persistor={persistor}> */}
        <RouterProvider router={router} />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>)
