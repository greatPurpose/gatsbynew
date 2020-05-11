// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import classnames from 'classnames';

import TopNavbar from '../components/TopNavbar';
import './LandingPage.css';

export default class LandingPage extends Component {
  onSubmit = event => {
    event.preventDefault();
    this.props.login(this.username.value, this.password.value);
  };

  render() {
    return (
      <div className="LandingPage">
        <TopNavbar user={this.props.user} />
        <div className="headerSection">
          <div className="container">
            <div className="row">

              <div className="col-lg-12">
                <h1 className={classnames("title", {hasLogin: !this.props.user})}>
                  Your curated, data-driven guide to the Bioeconomy
                </h1>
              </div>



              <div className="col-lg-12">
                {
                  !this.props.user &&
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input type="text"
                             className="form-control"
                             placeholder="Username"
                             ref={element => this.username = element}
                      />
                    </div>
                    {
                      this.props.errors && this.props.errors.username &&
                      <div>{this.props.errors.password}</div>
                    }

                    <div className="form-group">
                      <input type="password"
                             className="form-control"
                             placeholder="Password"
                             ref={element => this.password = element}
                      />
                      {
                        this.props.errors && this.props.errors.password &&
                        <div>{this.props.errors.password}</div>
                      }
                    </div>

                    <button type="submit"
                            className="btn btn-primary"
                            disabled={this.props.loginInProgress}
                    >LOG IN
                    </button>

                    {
                      this.props.loginError &&
                      <div style={{color: 'red', marginTop: 10, float: 'right'}}>
                        {this.props.loginError}
                      </div>
                    }

                  </form>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}