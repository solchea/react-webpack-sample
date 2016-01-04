var React = require('react')
var DocumentTitle = require('react-document-title')

var Home = React.createClass({

  displayName: 'NotFound',

  render: function () {
    var title = 'Not Found'

    return (
      <DocumentTitle title={ title }>
        <div>Page Not Found</div>
      </DocumentTitle>
    )
  }
})

module.exports = Home
