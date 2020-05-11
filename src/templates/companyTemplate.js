import React from "react"
import Helmet from 'react-helmet'
import { graphql } from "gatsby"

import Layout from '../components/grid/Layout'
import News from '../components/grid/News'
import Whitepaper from '../components/grid/Whitepaper'
import ContentBlock from '../components/grid/ContentBlock'
import KeyNumber from '../components/grid/KeyNumber'
import Iframe from '../components/grid/Iframe'
import Modal from '../components/grid/Modal';

export default class Template extends React.Component {
  constructor(props) {
    super(props)

    this.news = []
    this.whitepaper = {}

    try {
      this.whitepaperPDF = require(`../content/md/companies/${this.getCompanyName()}/whitepaper.pdf`)
      this.documentXSLX = require(`../content/md/companies/${this.getCompanyName()}/document.xlsx`)
    } catch (error) {
      console.warn(error.message)
    }

    this.parseBodyContent = this.parseBodyContent.bind(this)
    this.getNodes = this.getNodes.bind(this)
    this.getCompanyName = this.getCompanyName.bind(this)
    this.scrollHandler = this.scrollHandler.bind(this)

    this.getNodes()

    const currentPath = this.props.location.pathname

    this.state = {
      ...this.parseBodyContent(),
      ...{ isModal: /\w?\/companies\/\w+\/\w+/.test(currentPath) },
    }
  }

  getCompanyName() {
    let name = this.props.pageContext.companyName
    return name[0].toUpperCase() + name.slice(1)
  }

  parseBodyContent() {
    const { frontmatter, html } = this.props.data.markdownRemark

    let keyNumbers = {}

    for (let key in frontmatter) {
      if(!!~key.indexOf('k_')) {
        const sliceKey = key.slice(2).replace(/_/g, ' ')

        keyNumbers[sliceKey] = {
          term: sliceKey,
          definition: frontmatter[key]
        }
      }
    }

    return {
      keyNumbers: keyNumbers,
      tables: html
    }
  }

  getNodes() {
    const companyName = this.props.pageContext.companyName

    const regexpNews = new RegExp(`companies\\/${companyName}\\/news`,'i')
    const regexpWhitepaper = new RegExp(`companies\\/${companyName}\\/whitepaper`,'i')

    this.props.data.news.nodes.forEach(item => {
      if (regexpNews.test(item.fileAbsolutePath)) {
        this.news.push({ ...item.frontmatter, ...{html: item.html, excerpt: item.excerpt}})
      }
    })

    this.props.data.whitepaper.nodes.forEach(item => {
      if (regexpWhitepaper.test(item.fileAbsolutePath)) {
        this.whitepaper = { ...item.frontmatter, ...{html: item.html, excerpt: item.excerpt}}
      }
    })
  }

  scrollHandler() {
    if (!this.state.isModal) {
      window.offset = window.pageYOffset
    }
  }


  componentDidMount() {
    if (window.offset === undefined) {
      window.offset = 0
    } else {
      window.willScroll = true
    }

    document.addEventListener('scroll', this.scrollHandler)
    if (window.willScroll && !this.state.isModal) {
      window.willScroll = false
      setTimeout(() => {window.scrollTo(0, window.offset)}, 120)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollHandler)
  }


  render() {
    const { markdownRemark } = this.props.data
    const { frontmatter } = markdownRemark

    const { keyNumbers, tables } = this.state

    return (
      <Layout containerId={'app-container--company'}>
        <Helmet title={frontmatter.title}/>

          <div className={'company-header'}> { frontmatter.title }, Inc. </div>

          <div className={'test2'}>
            <Whitepaper
              data={this.whitepaper}
              link={this.props.pageContext.companyPath + '/whitepaper'}
              pdf={this.whitepaperPDF}
            />
          </div>

          <ContentBlock>
            <KeyNumber mode={0} data={[
                keyNumbers['Current price'],
                keyNumbers['Week range']
              ]}/>
          </ContentBlock>

          <ContentBlock>
            <KeyNumber mode={0} data={[
              keyNumbers['Fair Value']
            ]}/>
          </ContentBlock>

          <ContentBlock>
            <KeyNumber mode={0} data={[
              keyNumbers['Valuation Method'],
              keyNumbers['Timeframe'],
              keyNumbers['Discount rate'],
              keyNumbers['Terminal Growth Rate']
            ]}/>
          </ContentBlock>

          <ContentBlock>
            <KeyNumber mode={0} data={[
              keyNumbers['Implied Multiple']
            ]}/>
          </ContentBlock>

          <ContentBlock gridClass={'test2'} title={'Other Key Figures'}>
            <div className={'key-number-other'}>
              <KeyNumber mode={1} data={[keyNumbers['Market Cap']]}/>
              <KeyNumber mode={1} data={[keyNumbers['Shared Outstanding']]}/>
              <KeyNumber mode={1} data={[keyNumbers['Cash']]}/>
              <KeyNumber mode={1} data={[keyNumbers['Operating Expenses']]}/>
              <div className={'key-number-wrapper'}>
                <h4 className={'key-number-pseudo-title'}>Capital Structure:</h4>
                <KeyNumber mode={1} data={[
                  keyNumbers['Equity'],
                  keyNumbers['Debt']
                ]}/>
              </div>

            </div>
          </ContentBlock>

          <ContentBlock
            gridClass={'grid-table'}
            title={'Revenu and Earnings Estimates'}
          >
            <div
              dangerouslySetInnerHTML={{ __html: tables }}
              className={'company-table'}
            />

          </ContentBlock>

          <ContentBlock
            gridClass={'grid-table'}
            title={'Excel Financial Model'}
            button={{
              icon: require('../assets/img/excel.svg'),
              title: 'Download OneDrive Excel',
              link: this.documentXSLX
            }}
          >

            <Iframe
              iframeSrc={ frontmatter.excelUrl }
            />

          </ContentBlock>

          <News data={this.news}/>
        {
          !this.state.isModal ? null :
            <Modal
              data={this.props.data.post}
              pdf={this.whitepaperPDF}
              link={this.props.pageContext.companyPath}
              showType={true}
            />
        }

      </Layout>
    )
  }
}

export const pageQuery = graphql`
 
  query($companyPath: String!, $subPath: String) {

    markdownRemark: markdownRemark(frontmatter: { path: { eq: $companyPath} }) {
      html
      frontmatter {
        path
        title
        excelUrl
        k_Cash
        k_Current_price
        k_Debt
        k_Discount_rate
        k_Equity
        k_Fair_Value
        k_Implied_Multiple
        k_Market_Cap
        k_Operating_Expenses
        k_Shared_Outstanding
        k_Terminal_Growth_Rate
        k_Timeframe
        k_Valuation_Method
        k_Week_range
      }
    }
    
    post: markdownRemark(frontmatter: { path: { eq: $subPath } }) {
      html
      frontmatter {
        path
        title
        date
        author
        type
      }
    }
    
    news: allMarkdownRemark(filter: {frontmatter: {path: {regex: "/companies\\/.+\\/news/"}}}) {
      nodes {
        frontmatter {
          path
          author
          date
          title
          type
        }
        html
        excerpt(pruneLength: 75)
        fileAbsolutePath
      }
    }
    
    whitepaper: allMarkdownRemark(filter: {frontmatter: {path: {regex: "/companies\\/.+\\/whitepaper/"}}}) {
    nodes {
      frontmatter {
        path
        author
        date
        title
        type
      }
      html
      excerpt(pruneLength: 500)
      fileAbsolutePath
    }
  }
}`
