import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';

// store contains the state of all our react components
const store = createStore(() => [], {}, applyMiddleware());

// hook up store to the root of our react application so that 
// all react components can access the store and retrieve state
ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root'));