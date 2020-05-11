// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { routes } from '../constants';
import Logo from '../assets/Logo';
import './TopNavbar.css';

export default class TopNavbar extends Component {

  render() {
    const filterColor = this.props.activeFilter ? 'red' : 'white';

    return (
      <div className="TopNavBar">
        <nav className="navbar navbar-default">
          <div className="container">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>

              {
                this.props.showFiltersButton &&
                <div className="filters hidden-lg hidden-md hidden-sm"
                     style={{color: filterColor}}
                     onClick={this.props.onFiltersButtonClick}>
                  <i className="fa fa-filter" aria-hidden="true"/>
                </div>
              }

              <NavLink className="navbar-brand" to="/">
                <Logo />
              </NavLink>

            </div>

            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                { <li><NavLink activeClassName="active" to={routes.fundraisingExplorer} exact>Fundraising Explorer</NavLink></li> }
                {
                  (this.props.user && this.props.user.is_staff === 'True') &&
                  <li><NavLink activeClassName="active" to={routes.patentsExplorer}>Patent Explorer</NavLink></li>
                }

                {
                  (!this.props.user || this.props.user.is_staff !== 'True') &&
                  <li><a onClick={event => {event.preventDefault()}}>Patent Explorer (coming soon)</a></li>
                }

                {
                  //<li><NavLink activeClassName="active" to={routes.FAQ} exact>FAQ</NavLink></li>
                }

                { this.props.user && <li><NavLink activeClassName="active" to={routes.logout}>Logout</NavLink></li> }
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}