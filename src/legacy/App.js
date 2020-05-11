// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import { Switch } from 'react-router';
import { withRouter } from "react-router-dom";
import seedrandom from 'seedrandom';

import { login, setToken } from './helpers/agent';
import { PrivateRoute, PropsRoute } from './helpers/routes';
import { routes } from './constants';
import FundraisingCharts from './containers/FundraisingCharts';
import LandingPage from './containers/LandingPage';
import FAQ from './containers/FAQ';
import TOS from './containers/TOS';
import Privacy from './containers/Privacy';
import PatentsExplorer from './containers/PatentsExplorer';
import Footer from './components/Footer';

import './App.css';

class Logout extends Component {
  componentWillMount() {
    this.props.logout();
  }

  render() {
    return <div />;
  }
}

class App extends Component {
  state = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  };

  onClick = () => {};

  componentWillMount() {
    if (this.state.user) {
      setToken(this.state.user.token);
    }
    seedrandom('biopitchbookrandomstring', { global: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.user && !prevState.user) {
      this.props.history.push(routes.fundraisingExplorer);
    }
  }

  login = (username, password) => {
    this.setState({loginError: '', user: null, loginInProgress: true});

    login(username, password)
      .then(response => {
        response = response.body;
        localStorage.setItem('user', JSON.stringify(response.user));
        setToken(response.user.token);

        this.setState({loginInProgress: false, user: response.user});

        return response;
      })
      .catch(error => {
        let errorMessage = 'Ups! Something went wrong!';
        try {
         errorMessage = JSON.parse(error.response.text).errors.error
        } catch (error) {
          console.log(error);
        }
        this.setState({loginError: errorMessage, user: null, loginInProgress: false});
      })
  };

  logout = () => {
    this.setState({user: null});
    localStorage.removeItem('user');
    this.props.history.push(routes.landingPage);
  };

  render() {
    return (
      <div className="App" onClick={this.onClick}>
        <Switch>
          <PropsRoute path={routes.landingPage} exact
                      component={LandingPage}
                      login={this.login}
                      loginInProgress={this.state.loginInProgress}
                      loginError={this.state.loginError}
                      user={this.state.user}
          />
          <PropsRoute path={routes.logout} exact
                      logout={this.logout}
                      component={Logout}
          />
          <PrivateRoute authed={!!this.state.user}
                        path={routes.fundraisingExplorer}
                        exact
                        component={FundraisingCharts}
                        user={this.state.user}
          />
          <PrivateRoute authed={!!this.state.user}
                        path={routes.patentsExplorer}
                        component={PatentsExplorer}
                        user={this.state.user}
          />
          <PropsRoute path={routes.FAQ} exact
                      user={this.state.user}
                      component={FAQ}
          />
          <PropsRoute path={routes.TOS} exact
                      user={this.state.user}
                      component={TOS}
          />
          <PropsRoute path={routes.Privacy} exact
                      user={this.state.user}
                      component={Privacy}
          />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
