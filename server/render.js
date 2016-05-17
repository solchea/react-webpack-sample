/**
 * Dependencies
 */
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'
import { get } from 'lodash'
import path from 'path'
import glob from 'glob'

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from './../client/routes';

/**
 * Local Dependencies
 */

module.exports = function () {
  var configureStore = require('./../client/lib/configureStore')
  var NotFound = require('./../client/routes/not-found.jsx')

  return function (req, res) {
    /**
     * Silly way of handling non 200 errors: render not found route if earlier
     * middleware sets the `res.statusCode` to non 200.
     */
    var url = req.originalUrl
    if (res.statusCode !== 200) {
      url = process.env.BASE_URI
    }

    /**
     * This is where all the magic happens. We need to resolve any data
     * dependency for the route handler async before passing it to
     * the client.
     *
     * Once `./public/js/bundle.min.js` is executed it should pick up where
     * the server leaves off... meaning no re-rendering and just binding event
     * handlers and tracking etc...
     */
    var store = configureStore()
    //var routes = require('./../client/routes/index.jsx')

    match({ routes, location: url }, (error, redirectLocation, renderProps) => {
      var buildResponse = function (err) {
        var initialState
        var markup
        var html
        if (err) {
          // Render a NotFound and tell the client to not try to attach to react root
          initialState = 404
          markup = ReactDOMServer.renderToString(<NotFound/>)
        } else {
          initialState = store.getState()
          markup = ReactDOMServer.renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps}/>
            </Provider>
          )
        }
        Helmet.rewind()

        return {
          initialState: initialState,
          markup: markup
        }
      }

      if (error) {
        res.status(404)
        html = buildResponse(error)
        res.send(html)
        return
      }

      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search)
        return
      }

      // check the matched route for a bootstrap function
      var len = get(renderProps, 'routes.length')
      var lastRoute = len && renderProps.routes[len - 1]
      var bootstrap = lastRoute && get(lastRoute, 'component.bootstrap')

      var scripts = []
      var css = []

      if (process.env.NODE_ENV === 'development') {
        scripts = [
          'http://localhost:8080/webpack-dev-server.js',
          'http://localhost:8080/public/build/js/vendor.bundle.js',
          'http://localhost:8080/public/build/js/bundle.js'
        ]
      } else {
        var js = glob.sync(
          'public/build/js/bundle.*.js', {root: __dirname}
        );

        scripts = js.map(function (f) {
          return '/public/build/js/' + path.basename(f);
        });

        var styles = glob.sync(
          'public/build/css/bundle.*.css', {root: __dirname}
        );

        css = styles.map(function (f) {
          return '/public/build/css/' + path.basename(f);
        });
      }

      if (bootstrap) {
        bootstrap(store, req, res, (err) => {
          var content
          if (err) {
            res.status(404)
            content = buildResponse(err)
          } else {
            content = buildResponse()
          }
          res.render('index', {
            title: process.env.APP_TITLE,
            scripts: scripts,
            css: css,
            initialState: JSON.stringify(content.initialState),
            markup: content.markup
          })
        })
      // If the route doesn't need any data fetched, render immediately
      } else {
        var content = buildResponse()
        res.render('index', {
          title: process.env.APP_TITLE,
          scripts: scripts,
          css: css,
          initialState: JSON.stringify(content.initialState),
          markup: content.markup
        })
      }
    })
  }
}
