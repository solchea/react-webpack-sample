import { combineReducers } from 'redux'

const { routeReducer: routing } = require('redux-simple-router')

var toDash = function (str) {
  return str.replace(/([A-Z])/g, function ($1) {
    return '-' + $1.toLowerCase()
  })
}

var reducerNames = [
  'default'
]

var reducers = reducerNames.reduce(function (allReducers, reducerName) {
  allReducers[reducerName] = require('./reducers/' + toDash(reducerName))
  return allReducers
}, {})

const combinedReducers = combineReducers({
  ...reducers,
  routing
})

export const rootReducer = function (state = {}, action) {
  return combinedReducers(state, action)
}