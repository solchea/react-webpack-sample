import React from 'react'
import Helmet from "react-helmet";

export default class NotFound extends React.Component {
  static displayName = 'NotFound'

  constructor(props) {
    super(props)
    // Operations usually carried out in componentWillMount go here
  }

  render() {
    var title = 'NotFound'

    return (
      <Helmet title={title}>
        <div>Page Not Found</div>
      </Helmet>
    )
  }
}
