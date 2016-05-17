import React from 'react'
import Helmet from 'react-helmet'

export default class Home extends React.Component {
  static displayName = 'Home'

  constructor(props) {
    super(props)
    // Operations usually carried out in componentWillMount go here
  }

  render() {
    var title = 'Home'

    return (
      <div>
        <Helmet title={title} />
        <div>Hello World</div>
      </div>
    )
  }
}
