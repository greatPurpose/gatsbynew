import React from 'react'
import PropTypes from 'prop-types'
import PostType from './PostType'

import close from '../../assets/img/close.svg'
import { Link } from 'gatsby'

export default class News extends React.Component{
  static propTypes = {
    author: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    type: PropTypes.number,
    content: PropTypes.string,
    path: PropTypes.string
  };

  constructor(props) {
    super(props)

    this.state = {
      isMax: false
    }
  }


  render() {
    return (
      <article
        className={this.state.isMax ? 'news news--maximize' : 'news'}
        onClick={this.toggleSize}>
        <div className={'news__wrapper'}>
          <header className={'news__header'}>
            {
              this.state.isMax ?
                <img className={'news__close'}
                   alt={'close button'}
                   src={close}
                   onClick={this.toggleSize}
                /> : ''
            }
            <div className={'news__header-wrapper'}>
              <h3 className={'news__title'}>{ this.props.title }</h3>
              <div className={'news__info-wrapper'}>
                <div className={'news__author'}>By { this.props.author ? this.props.author : 'Author' }</div>
                <div className={'news__date'}>
                  { this.props.date.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}) }
                </div>
              </div>
            </div>
            <PostType type={this.props.type}/>
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

          </div>
        </div>
      </article>
    )
  }

}
