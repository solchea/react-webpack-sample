import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'

var fastclick = require('fastclick')

var App = require('./routes/app')
var Home = require('./routes/home')
var NotFound = require('./routes/not-found')

var history = createHistory()

// Webpack lets us us embed styles and assets within the code.
require('./styles/main.less')

/**
 * Remove 300ms delay in tapping for mobile.
 */
fastclick.attach(document.body)

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
), document.getElementById('app-container'))



