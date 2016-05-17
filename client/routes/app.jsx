import React from 'react'
import Helmet from "react-helmet"

export default class App extends React.Component {
  static displayName = 'App'

  constructor(props) {
    super(props)
    // Operations usually carried out in componentWillMount go here
  }

  render() {
    var title = 'App'

    return (
      <div>
        <Helmet title={title} />
        {this.props.children}
      </div>
    )
  }
}
