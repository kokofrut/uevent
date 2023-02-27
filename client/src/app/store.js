import { configureStore, combineReducers } from '@reduxjs/toolkit'
import searchReducer from '../features/search/searchSlice'
import eventsReducer from '../features/events/eventsSlice'
// import currEventReducer from '../features/currEvent/currEventSlice'
import userReducer from '../features/userSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

// const persistConfig = {
//     key: 'root',
//     storage,
//     // whitelist: ['search']  // add the state you want to persist
// }

const rootReducer = combineReducers({ 
    search: searchReducer,
    events: eventsReducer,
    // currEvent: currEventReducer,
    user: userReducer,
})
// const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

// export const persistor = persistStore(store)