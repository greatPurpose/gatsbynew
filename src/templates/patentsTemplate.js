import React from "react"
import Helmet from 'react-helmet'

import Layout from '../components/grid/Layout'
import Patents from '../legacy/containers/PatentsExplorer'

// import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';


export default class Template extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout
        // containerId={'app-container--charts'}
      >
        <Helmet title={'Patents explorer'}/>
        <Patents/>
      </Layout>
    )
  }
}
