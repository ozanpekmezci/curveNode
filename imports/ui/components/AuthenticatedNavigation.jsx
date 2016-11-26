import React from 'react';
import {browserHistory} from 'react-router';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';
import {Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import FontAwesome from 'react-fontawesome';
import NotificationMenuItem from './NotificationMenuItem.jsx';


const AuthenticatedNavigation = ({notifications}) => {

  const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));
  const handleNotificationClick = (url) => {
  browserHistory.push(url)};

  const userName = () => {
    const user = Meteor.user();
    const name = user && user.profile
      ? user.profile.name
      : '';
    return user
      ? `${name.first} ${name.last}`
      : '';
  };


  return (
    <div>
      <Nav>
        <IndexLinkContainer to="/">
          <NavItem eventKey={1} href="/">Index</NavItem>
        </IndexLinkContainer>
        <LinkContainer to="/products">
          <NavItem eventKey={2} href="/products">Products</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>

        <NavDropdown eventKey={3} title={userName()} id="basic-nav-dropdown">
          <MenuItem eventKey={3.1} onClick={handleLogout}>Logout</MenuItem>
        </NavDropdown>
        <NavDropdown eventKey={4} title={< FontAwesome name="bell" />} id="basic-nav-dropdown">
          {notifications.map((notification) => {
            return (

              <NotificationMenuItem key={notification._id} notification={notification} handleNotificationClick={handleNotificationClick} />
            );
          })}
        </NavDropdown>
      </Nav>
    </div>
  );
};
export default AuthenticatedNavigation;
AuthenticatedNavigation.propTypes = {
  notifications: React.PropTypes.array
};
