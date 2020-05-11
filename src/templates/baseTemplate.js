import React from "react"
import Helmet from 'react-helmet'
import { graphql } from "gatsby"

import Layout from '../components/grid/Layout'

export default function Template(test) {
  const { markdownRemark } = test.data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <Helmet title={ frontmatter.title }/>
      <div
        className="container single-page"
        dangerouslySetInnerHTML={{ __html: html }}
      >
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
      children {
        id
      }
    }
  }
`
