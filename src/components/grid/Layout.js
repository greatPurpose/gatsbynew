import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Footer from '../grid/Footer'
import Header from '../grid/Header'

import '../../assets/sass/main-grid.scss'

export default class Layout extends Component {
  render() {
    const { containerId } = this.props

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <div id={ containerId || 'app-container--base' }>
            <Header/>
            <main id={ 'main-container' }>

              <Helmet title={ data.site.siteMetadata.title }>
                <html lang="en"/>
              </Helmet>

              { this.props.children }

            </main>
            <Footer/>
          </div>
        )}
      />
    )
  }
}
