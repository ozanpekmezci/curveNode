import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import PublicNavigation from './PublicNavigation.jsx';
import AuthenticatedNavigation from './AuthenticatedNavigation.jsx';

class AppNavigation extends React.Component {
  static renderNavigation(hasUser,notifications) {
    return hasUser ? <AuthenticatedNavigation notifications={notifications} /> : <PublicNavigation />;
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
        { AppNavigation.renderNavigation(this.props.hasUser, this.props.notifications) }
      </Navbar.Collapse>
    </Navbar>);
  }
}
export default AppNavigation;
AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
  notifications: React.PropTypes.array
};
