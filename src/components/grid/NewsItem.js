import React from 'react'
import PostType from './PostType'
import { Link } from 'gatsby'

export default class News extends React.Component {
  render() {
    return (
      <div className={'news-item'}>
        <div className={'news-item-type'}>
          <PostType
            width={'3.3rem'}
            height={'3.3rem'}
            gap={'.3rem'}
            type={this.props.data.type}
          />
        </div>

        <span className={'news-item-date'}>
          { new Date(this.props.data.date).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}) }
        </span>
        <div className={'news-item-content'}>
          { this.props.data.excerpt }
          <Link to={this.props.data.path} className={'link'}> Read more</Link>
        </div>
      </div>
    )
  }
}
