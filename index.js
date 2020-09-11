const { bindActionCreators } = require("redux")

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