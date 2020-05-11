import React from 'react'
import { Link } from 'gatsby'

export default class Footer extends React.Component {
  render() {
    return (
      <footer id={'footer-container'}>
        <div id={'footer-content'}>
          <span className={'footer-rights'}>© All Rights Reserved</span>
          <Link to={'/terms-of-use/'}>
            Terms of Use
          </Link>
          <Link to={'/privacy-policy/'}>
            Privacy Policy
          </Link>
        </div>
      </footer>
    )
  }
}
