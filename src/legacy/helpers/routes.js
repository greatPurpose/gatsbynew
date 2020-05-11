// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React  from 'react';
import { Route } from 'react-router';
import { Redirect } from "react-router-dom";
import { routes } from '../constants';


export const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
};

export function PrivateRoute ({component: Component, authed, ...rest}) {
  console.log(authed);
  if (!authed) {
    return <Redirect to={{pathname: routes.landingPage}} />
  }

  return <PropsRoute component={Component} {...rest} />;
}

export const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
};