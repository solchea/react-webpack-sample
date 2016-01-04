var React = require('react')
var DocumentTitle = require('react-document-title')

var App = React.createClass({

  displayName: 'App',

  render: function () {
    var title = 'App'

    return (
      <DocumentTitle title={ title }>
        {this.props.children}
      </DocumentTitle>
    )
  }
})

module.exports = App
