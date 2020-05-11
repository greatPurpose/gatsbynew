// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { routes } from '../constants';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <section className="aboutSection">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <h4><span>About Us</span></h4>
                <p>Varro Analytics is tracking innovative private companies in the biology space. Use the slider below to see how funding and valuations have changed over time and which companies have exited. Click each company in the chart to learn more about it.</p>
              </div>
              <div className="col-md-4 col-sm-6">
                {
                  //<h4><span>Stay Updated</span></h4>

                  //<p>
                  //  Sign up for our newsletter. We won't share your email address
                  //</p>
                  //
                  //< form className="form-inline">
                  //<div className="form-group">
                  //<input type="email" className="form-control" placeholder="Email Address" />
                  //<button type="submit" className="btn btn-default">Sign Up</button>
                  //</div>
                  //</form>
                }

                <h4><span>Follow Us</span></h4>
                <p>
                  <a href="https://twitter.com/Varro_Analytics"><i className="fa fa-twitter" /></a>
                  {
                   // <a href=""><i className="fa fa-linkedin"/></a>
                  }
                </p>
              </div>
              <div className="col-md-4 col-sm-6">
                <h4><span>Contact Us</span></h4>
                <p>
                  Varro Analytics <br />
                  <a href="mailto:info@varroanalytics.com">info@varroanalytics.com</a>
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className="copyrightSection">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p>© 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED. &nbsp;&nbsp;&nbsp;
                  <NavLink to={routes.Privacy}>Privacy Policy</NavLink>  &nbsp;|&nbsp;
                  <NavLink to={routes.TOS}>Terms of Use</NavLink>
                </p>
              </div>
            </div>
          </div>
        </section>

      </footer>
    );
  }
}