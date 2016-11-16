import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';
import Products from '../../ui/pages/Products.jsx';
import Index from '../../ui/pages/Index.jsx';
import Login from '../../ui/pages/Login.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';
import RecoverPassword from '../../ui/pages/RecoverPassword.jsx';
import ResetPassword from '../../ui/pages/ResetPassword.jsx';
import Signup from '../../ui/pages/Signup.jsx';
import ProductDetail from '../../ui/pages/ProductDetail.jsx';
import Order from '../../ui/pages/Order.jsx';

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute name="index" component={Index} onEnter={requireAuth} />
        <Route name="products" path="/products" component={Products} onEnter={requireAuth} />
        <Route path="/products/:id" component={ProductDetail} onEnter={requireAuth} />
        <Route path="/orders/:id" component={Order} onEnter={requireAuth} />
        <Route name="login" path="/login" component={Login} />
        <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
        <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
        <Route name="signup" path="/signup" component={Signup} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
