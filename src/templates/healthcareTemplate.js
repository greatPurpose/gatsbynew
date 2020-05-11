import React from "react"
import Helmet from 'react-helmet'
import { graphql, Link } from "gatsby"

import Layout from '../components/grid/Layout'
import Button from '../components/grid/Button';
import Modal from '../components/grid/Modal';

export default class Template extends React.Component {
  constructor(props) {
    super(props)

    const currentPath = this.props.location.pathname

    this.iframe = React.createRef()

    if (!!~currentPath.indexOf('/healthcare/use')) {
      this.modalFrontmatter = this.props.data.use
    }

    if (!!~currentPath.indexOf('/healthcare/methodology')) {
      this.modalFrontmatter = this.props.data.methodology
    }

    if (!!~currentPath.indexOf('/healthcare/hazard')) {
      this.modalFrontmatter = this.props.data.hazard
    }

    this.state = { isModal: !/healthcare\/?$/.test(currentPath) }

    this.scrollHandler = this.scrollHandler.bind(this)

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
    const { html, frontmatter } = markdownRemark

    return (
      <Layout
        containerId={'app-container--charts'}
      >
        <Helmet title={frontmatter.title}/>

        <div className={'chart-md'}>
          <h2>Tracking the Long Positions <br/> of Healthcare Specialist Funds</h2>

          <p>            
          In the interactive charts below, Varro is aggregating the recent buys and sells of 
          institutional investors that are singularly-focused on the healthcare sector. 
          Compared to their generalist peers, these specialist funds spend a disproportionate 
          amount of time and money on healthcare stock due diligence. Their transactions are therefore
          worth tracking in a consolidated, graphical format. All data is sourced from SEC Forms&nbsp;
          <a href="https://bit.ly/2LJz2f1">13F</a> and  <a href="https://bit.ly/2MeZUm6">13D/13G</a>.
          </p>

          <p>  
          The charts can help individual investors to both discover stocks that are currently favored by 
          specialist funds and to quickly determine whether certain stocks they like
          have been overlooked by specialist funds. 
          </p>

          <p>
          Varro originally created these charts for internal use, but decided to provide them as a 
          free resource to&nbsp;<a href="https://twitter.com/PLOS/lists/plos-synbio/members">the</a>
          &nbsp; 
          <a href="https://twitter.com/ldtimmerman/lists/biotechtweeters/members">BioTwitter</a>
          &nbsp;
          <a href="https://twitter.com/search?q=jpm%20tweetup&src=typed_query">community</a>.
          The intent is simply to generate good discussions regarding valuation of individual healthcare 
          stocks of interest. BioTwitter may lack the resources of institutional investors, 
          but it makes up for it in the collective expertise and insight of its commenters, who include
          scientists, engineers, physicians, journalists, executives, consultants 
          and individual investors.
          </p>

          <p> 
            The y-axis measures the amount of conviction a fund has in a particular company during 
            a given quarter by the percent of shares outstanding it has recently bought or sold. 
            Users can toggle the grey buttons below to display funds whose top 20 
            equal-weight holdings have outperformed or underperformed the S&P 500 over the past three years 
            (benchmarked with the <a href="https://bit.ly/2pxiyyh">"WhaleScore"</a>, as calculated by WhaleWisdom.com). 
          </p>

          <p>
            For a methodology of which stocks and healthcare specialist funds are included in the charts, as well as an explanation of certain quirks 
            that are present in the data,&nbsp;
            <Link to={'/healthcare/methodology/'}>
              click here.
            </Link>
          </p>
          <p>
            For a primer on the hazards of investing based solely on these charts,&nbsp;
            <Link to={'/healthcare/hazards/'}>
              click here.
            </Link>
          </p>

          <p>
          For an overview of the main features of the charts,&nbsp;
            <Link to={'/healthcare/use/'}>click here.
            </Link> 
          </p>

        </div>

        <div className={'chart-button-wrapper'}>
          <Button
            title={'Download OneDrive Excel'}
            icon={require('../assets/img/excel.svg')}
            link={'/'}
          />
        </div>

        <div className="chart-container">

          <iframe
            ref={this.iframe}
            className={'chart'}
            src={'https://varro25.github.io/D3-Charts/'}
            title={'Excel document'}
            frameBorder="0"
          />

        </div>

        {
          !this.state.isModal ? null :
            <Modal
              data={this.modalFrontmatter}
              link={'/healthcare/'}
              showType={true}
            />
        }

      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query($path: String!) {

    markdownRemark: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }

    use: markdownRemark(frontmatter: { path: { eq: "/healthcare/use/" } }) {
      html
      frontmatter {
        path
        title
      }
    }    


    methodology: markdownRemark(frontmatter: { path: { eq: "/healthcare/methodology/" } }) {
      html
      frontmatter {
        path
        title
      }
    }

    hazard: markdownRemark(frontmatter: { path: { eq: "/healthcare/hazards/" } }) {
      html
      frontmatter {
        path
        title
      }
    }

  }
`
