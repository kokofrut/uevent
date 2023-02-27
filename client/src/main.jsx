
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Auth from './components/containers/auth/auth'
import './index.scss'
import { store } from './app/store'
// import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import Dashboard from './components/containers/dashboard/dashboard'
import EventPage from './components/containers/eventPage/eventPage'
import PaymentPage from './components/containers/payment/PaymentPage'

import LoadingView from './components/common/loadingView/loadingView'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { fetchEvents } from './features/events/eventsSlice'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
    // fallback: smth
  },
  // {
  //   path: "/passTest",
  //   element: <PassTest/>
  // },
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
