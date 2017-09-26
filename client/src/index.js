import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router  } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import App from './components/App'
import { rootSaga } from './saga/index'

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <App />
    </Router>
  </Provider>,
  document.querySelector('.container')
);

