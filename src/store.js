import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import rootReducer from './reducers';

const initialState = {};

const middleware = [
    thunk,
    loadingBarMiddleware()
];

// dev tools middleware
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const store = createStore(
    rootReducer,
    initialState,
    composeSetup(
        applyMiddleware(...middleware)
    )
);

export default store;