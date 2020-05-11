import React from 'react'
import { Link } from 'gatsby'

import menuMap from '../../content/sidenav'

export default class Nav extends React.Component {
  constructor(props) {
    super(props)

    this.renderSubmenu = this.renderSubmenu.bind(this)
    this.renderLink = this.renderLink.bind(this)
    this.renderMenu = this.renderMenu.bind(this)

    this.menuMap = menuMap
  }

  renderMenu(data) {
    return (
      <ul className={ 'main-nav-wrapper' }>
        {
          data.map(item => (
            <li key={ item.linkTo } className={ 'main-nav-item' }>
              { !item.children ? this.renderLink(item) : this.renderSubmenu(item) }
            </li>
          ))
        }
      </ul>
    )
  }

  renderSubmenu(data) {
    const { children, linkTo, name } = data

    return (
      <>
        <Link
          to={ linkTo }
          activeClassName={ 'active-link' }
          getProps={ ({ isPartiallyCurrent }) => isPartiallyCurrent ? { className: 'active-link' } : null }
        >
          { name }
        </Link>

        { children && this.renderMenu(children) }
      </>
    )
  }

  renderLink(data) {
    const { linkTo, name } = data

    return (
      <Link
        to={ linkTo }
        activeClassName={ 'active-link' }
      >
        { name }
      </Link>
    )
  }

  render() {
    return (
      <nav className={ 'main-nav-container' }>
        { this.renderMenu(this.menuMap) }
      </nav>
    )
  }
}
