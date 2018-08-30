import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from 'src/components/app';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';

function handleRender(req, res) {
    if (req.xhr) {
        return;
    }

    const store = createStore(reducer, req.state, applyMiddleware(thunk));

    const content = ReactDOMServer.renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );

    res.render('index.hbs', {
        content,
        state: escape(JSON.stringify(Object.assign({}, store.getState())))
    });
}

export default handleRender;
