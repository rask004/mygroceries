import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import storeFactory from './store';

// get any initial state
import sampleData from './data/initialState.json';

// set up any subscription functions.

// get the store from the store factory, with initialState
const store = storeFactory( sampleData? sampleData: {} );


// subscribe to store as needed


window.store = store;


ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>, 
    document.getElementById('root')
);

