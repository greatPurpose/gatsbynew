import React from "react"
import Helmet from 'react-helmet'
import { graphql, Link } from "gatsby"
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-zugzug'

import Layout from '../components/Layout'
import adobe from '../assets/img/adobe.svg'

export default class Template extends React.Component {
  constructor(props) {
    super(props)

    this.renderModal = this.renderModal.bind(this)
    this.renderPage = this.renderPage.bind(this)
    this.getCompanyName = this.getCompanyName.bind(this)
  }

  getCompanyName() {
    let companyName = this.props.data.markdownRemark.frontmatter.path.match(/.+\/(.+)\//)[1]
    return companyName = companyName[0].toUpperCase() + companyName.slice(1)
  }

  renderAdobeLogo(pdf) {
    return (
      !pdf ? null :
        <a href={pdf ? pdf : ''}
           target={'_blank  '}
           className={'news__pdf'}>
          <img className={'news__adobe'}
               src={ adobe }
               alt="pdf"
               width={27}
               height={27}
          />
        </a>
    )
  }

  renderContent() {
    const { markdownRemark } = this.props.data
    const { frontmatter, html } = markdownRemark

    const { author, date, title } = frontmatter

    let pdf, logo

    try {
      pdf = require(`../content/md/companies/${this.getCompanyName()}/whitepaper.pdf`)
      logo = require(`../content/md/companies/${this.getCompanyName()}/logo.png`)
    } catch (e) {
      console.warn(e.message)
    }

    return (
      <div className="container single-page">
        <div className={'news__wrapper'}>
          <header className={'news__header'}>

            <div className={'news__header-wrapper'}>
              <h3 className={'news__title'}>{ title }</h3>
              <div className={'news__info-wrapper'}>
                <div className={'news__author'}>By { author ? author : 'Author' }</div>
                <div className={'news__date'}>
                  { new Date(date).toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}) }
                </div>
              </div>
            </div>
            <div className={'news__type'}>
              {
                !logo ? null :
                  <img src={ logo }
                       alt={'logo'}
                  />
              }
            </div>
          </header>
          <div
            // className={'news__content'}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <br/>
          { this.renderAdobeLogo(pdf) }
        </div>
      </div>
    )
  }

  renderModal(closeTo) {
    return (
      <div className={'gatsby-modal'}>
        <Link
          to={closeTo}
          className={'gatsby-modal__close-button'}
          state={{
            noScroll: true
          }}
        >
          <img src={require('../assets/img/close.svg')} alt="close"/>
        </Link>

        { this.renderContent() }

      </div>
    )
  }

  renderPage() {
    const { markdownRemark } = this.props.data
    const { frontmatter } = markdownRemark

    return (
      <Layout>
        <Helmet title={frontmatter.title}/>
        { this.renderContent() }
      </Layout>
    )
  }

  componentDidMount() {
    let modal = document.getElementsByClassName('ReactModal__Content')[0]
    let modalOverlay = document.getElementsByClassName('ReactModal__Overlay')[0]

    if (modal && modalOverlay) {
      modal.style.color = null
      modal.style.background = null
      modal.style.border = null
      modal.style.padding = null

      modalOverlay.style.color = null
      modalOverlay.style.background = null
    }
  }

  render() {
    return (
      <ModalRoutingContext>
        {
          ({ modal, closeTo }) => {
            return modal ? this.renderModal(closeTo) : this.renderPage(closeTo)
          }
        }
      </ModalRoutingContext>
    )
  }
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        author
        date
        title
        type
      }
    }
  }
`
