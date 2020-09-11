const redux = require("redux")
const createStore = redux.createStore
const combineReducers = redux.combineReducers

// reducer #1
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

// create another reducer to handle icecream
// create another reducer to handle icecream
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

// create root reducer: 
//  - this combines all reducers selected to make 1 reducer
//  - we need this because Store can only accept 1 reducer
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: icecreamReducer
})



// pass rootReducer + create store
const store = createStore(rootReducer)

// subscribe to store updates
const unsubscribe = store.subscribe(() => console.log('Updated state: ', store.getState()))

// calling dispatch on multi-reducer Store:
//  - will pass action to all combined reducers
//  - but only one of them will act on them
//
// action for first reducer
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
// action for second reducer
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()