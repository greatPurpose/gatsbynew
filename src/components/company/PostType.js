import React from 'react'
import PropTypes from 'prop-types'

export default class PostType extends React.Component {
  static propTypes = {
    type: PropTypes.number
  }

  data = [
    {
      imgSrc: require('../../assets/img/green-square.svg'),
      description: 'Impact: High positive'
    },
    {
      imgSrc: require('../../assets/img/yellow-square.svg'),
      description: 'Impact: Low positive'
    },
    {
      imgSrc: require('../../assets/img/orange-square.svg'),
      description: 'Impact: Low negative'
    },
    {
      imgSrc: require('../../assets/img/red-square.svg'),
      description: 'Impact: High negative'
    }
  ]

  render() {
    let { type } = this.props

    return (
      <div className={'news__type'}>
        <img src={ this.data[type - 1].imgSrc }
             alt={'news type'}
        />
        <div className={'news__type-description'}>
          { this.data[type - 1].description }
        </div>
      </div>
    )
  }
}
