import React from 'react';
import './App.css';
import CakeContainer from './components/CakeContainer';
// import provider 
//  - this allows us to provide our created store to our app
import { Provider } from 'react-redux'
// import the store you created 
import { store } from './redux/store';

function App() {
  return (
    // add Provider component and nest App children inside
    //  - doing this in App.js make store available to basically all components
    <Provider store={store}>
      <div className="App">
        <CakeContainer />
      </div>      
    </Provider>
  );
}

export default App;
