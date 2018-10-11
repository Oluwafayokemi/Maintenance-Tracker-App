import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import reducer from './reducer/';
import { saveState, loadState } from './util/persistState';


const persistedState = loadState();
const store = createStore(
  reducer,
  persistedState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));


export default store;
