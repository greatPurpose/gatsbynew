import adobe from '../../assets/img/adobe.svg'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby';

export default class Whitepaper extends React.Component {
  static propTypes = {
    author: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    pdf: PropTypes.string,
    content: PropTypes.string,
    logo: PropTypes.string,
    company: PropTypes.string,
    path: PropTypes.string
  }

  renderAdobeLogo(pdf) {
    return (
      !pdf ? null :
        <a href={pdf ? pdf : ''}
           target={'_blank'}
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

  render() {
    let pdf, logo

    try {
      pdf = require(`../../content/md/companies/${this.props.company}/whitepaper.pdf`)
      logo = require(`../../content/md/companies/${this.props.company}/logo.png`)
    } catch (e) {
      console.warn(e.message)
    }

    return (
      <article
        className={'news whitepaper'}
      >
        <div className={'news__wrapper'}>
          <header className={'news__header'}>

            <div className={'news__header-wrapper'}>
              <h3 className={'news__title'}>{ this.props.title }</h3>
              <div className={'news__info-wrapper'}>
                <div className={'news__author'}>By { this.props.author ? this.props.author : 'Author' }</div>
                <div className={'news__date'}>
                  { this.props.date.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}) }
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
            className={'news__content'}
            dangerouslySetInnerHTML={{ __html: this.props.content }}
          />
          <div className={'news__options'}>
            <Link to={this.props.path}
                  state={{
                    modal: true
                  }}>
              <div
                className={'news__read-more'}
              >Read more</div>
            </Link>
            { this.renderAdobeLogo(pdf) }
          </div>
        </div>
      </article>
    )
  }
}
