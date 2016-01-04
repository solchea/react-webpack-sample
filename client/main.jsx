/**
 * Dependencies
 */
var React = require('react')
var ReactDOM = require('react-dom')
var { match, Router } = require('react-router')
var fastclick = require('fastclick')
var createBrowserHistory = require('history/lib/createBrowserHistory')
let history = createBrowserHistory()
var { syncReduxAndRouter } = require('redux-simple-router')

/**
 * Local dependencies
 */
var { Provider } = require('react-redux')
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

  var store = configureStore(initialState)
  syncReduxAndRouter(history, store)

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>, document.getElementById('app-container')
  )
})

