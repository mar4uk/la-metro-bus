import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const initialState = JSON.parse(unescape(window.__INITIAL_STATE__));
delete window.__INITIAL_STATE__;

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('app-container'));
