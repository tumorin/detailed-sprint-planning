import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './root-reducer';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

// export const store = createStore(rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
//         applyMiddleware(sagaMiddleware)
//     ))

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&

    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25
    }) || compose;

const store = createStore( rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))


export default store