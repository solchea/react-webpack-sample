var React = require('react')
var DocumentTitle = require('react-document-title')

var Home = React.createClass({

  displayName: 'Home',

  render: function () {
    var title = 'Home'

    return (
      <DocumentTitle title={ title }>
        <div>Hello World</div>
      </DocumentTitle>
    )
  }
})

module.exports = Home
