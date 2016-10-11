import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import PublicNavigation from './public-navigation.jsx';
import AuthenticatedNavigation from './authenticated-navigation.jsx';

class AppNavigation extends React.Component {
  static renderNavigation(hasUser) {
    return hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />;
  }

  render() {
    return( <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Curve</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        { AppNavigation.renderNavigation(this.props.hasUser) }
      </Navbar.Collapse>
    </Navbar>);
  }
}
export default AppNavigation;
AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};
