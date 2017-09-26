import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router  } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import App from './components/App'
import { rootSaga } from './saga/index'
import { SIGN_IN_SUCCESS } from './reducers/auth/auth-actions'

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const token = localStorage.getItem('token');

// if the user have a token , consider the user to be sign in
if (token) {
  // we need to update state before any render occurs
  store.dispatch({ type: SIGN_IN_SUCCESS });
}

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <App />
    </Router>
  </Provider>,
  document.querySelector('.container')
);

