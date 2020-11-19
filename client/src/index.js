import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// store contains the state of all our react components
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// hook up store to the root of our react application so that 
// all react components can access the store and retrieve state
ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root'));