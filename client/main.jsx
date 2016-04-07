/**
 * Dependencies
 */
var React = require('react')
var ReactDOM = require('react-dom')
var fastclick = require('fastclick')
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'


/**
 * Local dependencies
 */
var configureStore = require('./lib/configureStore')

import routes from './routes'

// Webpack lets us us embed styles and assets within the code.
require('./styles/main.less')

/**
 * Remove 300ms delay in tapping for mobile.
 */
fastclick.attach(document.body)

document.addEventListener('DOMContentLoaded', function domLoaded (event) {
  var initialState = window.__INITIAL_STATE__

  // On a 404 page, store isn't initialized and the client shouldn't bootstrap anything
  if (initialState === 404) {
    return
  }
  var store = configureStore(history, initialState)
  const history = syncHistoryWithStore(browserHistory, store)

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>, document.getElementById('app-container')
  )
})
