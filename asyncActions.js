const redux = require("redux")
const createStore = redux.createStore
// apply middleware
const applyMiddleware = redux.applyMiddleware
// import redux-thunk
//  - this lib helps easily define ASYNC action creators
//  - does this by letting you return a function in place of action object
//      ...which is the only think action creators can return
const thunkMiddleware = require('redux-thunk').default
// import axios for api requests
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// create action creator functions
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}
const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

// create reducer passing action props based on what state props should change
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST: return {
            loading: true
        }
        case FETCH_USERS_SUCCESS: return {
            loading: false,
            users: action.payload,
            error: ''
        }
        case FETCH_USERS_FAILURE: return {
            loading: false,
            users: [],
            error: action.payload
        }
        default: return state
    }
}

// create an api call function that returns an action FUNCTION
//  - remember we can return a function instead of json cause of 'thunk'
const fetchUsers = () => {
    // pass dispatch method to allow dispatch usage in function
    return function(dispatch) {
        // call dispatch to set state to fetching 
        //  - thereby setting state.loading to true
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                // call dispatch to set state to successful 
                //  - setting state.loading to false
                //  - setting users = response.data
                const users = response.data
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error => {
                // call dispatch to set state to failure
                //  - setting state.loading to false
                //  - setting error to error.message
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => console.log(store.getState()))

// call the api function you created
//  - remember you have to call it within dispatch
store.dispatch(fetchUsers())
// OUTPUT:
// { loading: true }
// {
//     loading: false,
//         users: [
//             {
//                 id: 1,
//                 name: 'Leanne Graham',
//                 username: 'Bret',
//                 email: 'Sincere@april.biz',
//                 address: [Object],
//                 phone: '1-770-736-8031 x56442',
//                 website: 'hildegard.org',
//                 company: [Object]
//             },
//             {
//                 id: 2,
//                 name: 'Ervin Howell',
//                 username: 'Antonette',
//                 email: 'Shanna@melissa.tv',
//                 address: [Object],
//                 phone: '010-692-6593 x09125',
//                 website: 'anastasia.net',
//                 company: [Object]
//             },
//             {
//                 id: 3,
//                 name: 'Clementine Bauch',
//                 username: 'Samantha',
//                 email: 'Nathan@yesenia.net',
//                 address: [Object],
//                 phone: '1-463-123-4447',
//                 website: 'ramiro.info',
//                 company: [Object]
//             }
//         ],
//             error: ''
// }