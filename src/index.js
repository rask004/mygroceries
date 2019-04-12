import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import storeFactory from './store';
import CssBaseline from '@material-ui/core/CssBaseline';

// get any initial state
import sampleData from './data/initialState.json';

// set up any subscription functions.

// get the store from the store factory, with initialState
const store = storeFactory( sampleData? sampleData: {} );
store.getState();

// subscribe to store as needed


ReactDOM.render(
    <Provider store={store}>
        <CssBaseline/>
        {routes}
    </Provider>, 
    document.getElementById('root')
);

