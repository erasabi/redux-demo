const redux = require("redux")
const createStore = redux.createStore
const combineReducers = redux.combineReducers
// apply middleware
//  - middleware lets you add functionaliy between 2 redux stages
//      - after dispatching action and before it reaches reducer to be executed
//  - logging is a common middleware functionality
const applyMiddleware = redux.applyMiddleware
// import logger module:
//  - to use with middleware
const reduxLogger = require('redux-logger')
// create logger
const logger = reduxLogger.createLogger()


const BUY_CAKE = 'BUY_CAKE'
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}
const initialCakeState = {
    numOfCakes: 10

}
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}

const BUY_ICECREAM = 'BUY_ICECREAM'
function buyIcecream() {
    return {
        type: BUY_ICECREAM,
        info: 'Second redux action'
    }
}
const initialIcecreamState = {
    numOfIcecreams: 20
}
const icecreamReducer = (state = initialIcecreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM: return {
            ...state,
            numOfIcecreams: state.numOfIcecreams - 1
        }
        default: return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: icecreamReducer
})

// include logging middleware in Store on creation
const store = createStore(rootReducer, applyMiddleware(logger))

// remove the logging function in subscribe
// we dont need it now that we have logging middleware
const unsubscribe = store.subscribe(() => {})

// perform actions that trigger middleware
// logger output for second dispatch should look like:
// action BUY_ICECREAM @22: 29: 29.464
    // prev state { cake: { numOfCakes: 9 }, iceCream: { numOfIcecreams: 20 } }
    // action     { type: 'BUY_ICECREAM', info: 'Second redux action' }
    // next state { cake: { numOfCakes: 9 }, iceCream: { numOfIcecreams: 19 } }
store.dispatch(buyCake())
store.dispatch(buyIcecream())

unsubscribe()