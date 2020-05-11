import React from "react"
import Helmet from 'react-helmet'

import Layout from '../components/grid/Layout'
import Fundraising from '../legacy/containers/FundraisingCharts'

// import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


export default class Template extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout
        // containerId={'app-container--charts'}
      >
        <Helmet title={'Fundraising explorer'}/>
        <Fundraising/>
      </Layout>
    )
  }
}
