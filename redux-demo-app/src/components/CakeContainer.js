import React from 'react';
import { buyCake } from '../redux';
import { connect } from 'react-redux';

// create Container you plan to use with Redux
function CakeContainer(props) {
    return (
        <div>
            <h2>Number of cakes(w/mapProp funcs) - {props.numOfCakes}</h2>
            <button onClick={props.buyCake}>Buy Cake</button>
        </div>
    )
}

// maps initial store state to props 
//  - this is how CakeContainer can access state props.numOfCakes
const mapStateToProps = (state) => {
    return {
        numOfCakes: state.numOfCakes
    }
}

// maps dispatch method execution to props
//  - this is how CakeContainer can access dispatch for buyCakes()
const mapDispatchToProps = (dispatch) => {
    return {
        buyCake: () => dispatch(buyCake())
    }
}

// use reduxConnnect to tie the mapping functions to CakeContainer
// also connnects CakeContainer to Redux Store
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CakeContainer)