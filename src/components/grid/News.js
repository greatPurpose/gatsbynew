import React from 'react'
import NewsItem from './NewsItem'

export default class News extends React.Component {
  constructor(props) {
    super(props)

    this.renderItems = this.renderItems.bind(this)
    this.calcNewsStyles = this.calcNewsStyles.bind(this)

    this.state = {
      newsHeight: null
    }

    this.newsContainer = new React.createRef()
    this.newsHeader = new React.createRef()
  }

  calcNewsStyles() {
    let length, headerHeight, fontSize, itemHeight
    try {
      length = this.newsContainer.current.childNodes.length
      headerHeight = this.newsHeader.current.offsetHeight
      fontSize = parseInt(window.getComputedStyle(this.newsContainer.current, null).fontSize)
    } catch (e) {
      console.warn(e)
    }

    itemHeight = 0

    if (length) {
      itemHeight = this.newsContainer.current.childNodes[0].offsetHeight
    }

    this.setState({
      newsHeight: length < 6 ? (length * itemHeight) + headerHeight + fontSize * 2 + 'px' : null
    })
  }

  componentDidMount() {
    this.calcNewsStyles()

    window.addEventListener('resize', this.calcNewsStyles)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calcNewsStyles)
  }

  renderItems() {
    return this.props.data.map((item, index) => {
      return (
        <NewsItem
          data={item}
          key={index}
        />
      )
    })
  }

  render() {
    return (
      <div
        className={'news'}
        style={{
          maxHeight: this.state.newsHeight
        }}
      >
        <h3
          className={'news-header'}
          ref={this.newsHeader}
        >
          Recent Company Events
        </h3>
        <div
          className={'news-content'}
          ref={this.newsContainer}
        >
          { this.renderItems() }
        </div>
      </div>
    )
  }
}
