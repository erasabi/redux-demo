// import createStore
import { createStore } from 'redux'
import { cakeReducer } from './cake/cakeReducer'

// create & export default store
export const store = createStore(cakeReducer)

