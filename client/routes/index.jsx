/**
 * Dependencies
 */
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './app'
import Home from './home'
import NotFound from './not-found'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ Home } />
    <Route path="*" component={ NotFound } />
  </Route>
);
