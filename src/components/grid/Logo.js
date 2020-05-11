import React from 'react'
import { Link } from 'gatsby'
import logo from '../../assets/img/logo.svg'

export default class Logo extends React.Component {
  render() {
    return (
      <div className={'main-logo-container'}>
        <Link
          to={this.props.linkTo || '/'}
          className={'main-logo-wrapper'}
        >
          <img
            className={'main-logo'}
            src={ logo }
            alt='logo'
          />
        </Link>
      </div>
    )
  }
}
