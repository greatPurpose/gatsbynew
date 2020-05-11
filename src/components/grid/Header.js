import React from 'react'
import Logo from './Logo'
import Nav from './Nav'

export default class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isScrolled: false
    }

    this.scrollHandler = this.scrollHandler.bind(this)
  }

  componentDidMount() {
    this.setState({
      isScrolled: window.pageYOffset > 0
    })

    window.addEventListener('scroll', this.scrollHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler)
  }

  scrollHandler() {
    this.setState({
      isScrolled: window.pageYOffset > 0
    })
  }

  render() {
    const { isScrolled } = this.state || false
    return (
      <header
        id={'header-container'}
        className={ isScrolled ? 'fixed-header' : '' }
      >
        <div id={'header-content'}>
          <Logo/>
          <Nav/>
        </div>
      </header>
    )
  }
}
