const { BUY_CAKE } = require('./cakeTypes');

// create JSON initial state
const initialState = {
    numOfCakes: 10
}

// create reducer
export const cakeReducer = (state = initialState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}

export default cakeReducer;