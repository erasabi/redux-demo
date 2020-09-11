const redux = require("redux")
const createStore = redux.createStore

const BUY_CAKE = 'BUY_CAKE'

// action creator: function that returns an action
function buyCake() {
    // action is a json object that must include type prop
    return { 
        type: BUY_CAKE,
        info: 'First redux action'        
    }
}

// variable representing state
const initialState = {
    numOfCakes: 10
} 

// reducer: only way to change state
//  - only interacted with by actions
//  - take in prevState and action as params
//  - returns nextState
const reducer = (state = initialState, action) => {
    switch(action.type){
        case BUY_CAKE: return {
            ... state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}
// create your redux store
// - argument must be a reducer that returns the initial state 
const store = createStore(reducer)

// Redux Store Methods
//  1 getState(): returns current state of store
//  2 subscribe(someAnonFunction): 
//      - lets you listen in on store updates
//      - run someAnonFunction that triggers whenever actions are dispatched on store
//      - returns the unsubscribe function to be called when you're done listening
//  3 dispatch(someReducer):
//      - lets you change state
//      - takes in reducer functions

// #1 getState() to print state
console.log('Initial state: ', store.getState()) 

// #2a subscribe() used to print state on update
const unsubscribe = store.subscribe(() => console.log('Updated state: ', store.getState()))

// #3 dispatch() used to buy/remove a cake from store 
//   - which triggers subsribe to print after each removal
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

// #2b unsubscribe() made from return of subscribe to stop listener
unsubscribe()