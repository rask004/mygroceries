import appReducer from './reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware }from 'redux';


const thunkMiddleware = applyMiddleware(thunk);


export default (initialState={}) => 
    createStore(appReducer, initialState, thunkMiddleware);