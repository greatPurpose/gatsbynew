import React from 'react';
import { Link } from 'gatsby'

export default class Nav extends React.Component {
  constructor(props) {
    super(props)

    this.items = this.items.bind(this)
    this.renderLink = this.renderLink.bind(this)
    this.subMenu = this.subMenu.bind(this)
  }

  items(data) {
    return (
      <ul className={ 'main-nav__item-list' }>
        {data.map(s => (
          <li key={s.linkTo} className={ 'main-nav__item' }>
            {
              !s.children ? this.renderLink(s) : this.subMenu(s)
            }
          </li>
        ))}
      </ul>
    )
  }

  renderLink(data) {
    const { linkTo, name } = data
    return (
      <Link to={ linkTo } activeClassName={ 'active-link' }>
        { name }
      </Link>
    )
  }

  subMenu(data) {
    const { children, linkTo, name } = data
    return (
      <div className={'main-nav__submenu'}>
        {/*eslint-disable-next-line*/}
        <Link
          to={ linkTo }
          activeClassName={ 'active-link' }
          getProps={ ({ isPartiallyCurrent }) => isPartiallyCurrent ? { className: 'active-link' } : null }
          onClick={(e) => {e.preventDefault()}}
        > { name } </Link>
        { children && this.items(children) }
      </div>
    )
  }

  render() {
    return (
      <nav className={ 'main-nav' }>
        { this.items(this.props.sections) }
      </nav>
    )
  }
}
