import React from 'react';
import {MenuItem} from 'react-bootstrap';

const NotificationMenuItem = ({notification, handleNotificationClick}) => {
  const handleClick = () => {
    handleNotificationClick(notification.url);
  }
     return (
       <MenuItem  eventKey={`4.${notification._id}`} onClick={handleClick}>{`${notification.actorId} sent a ${notification.notifiableType}`}</MenuItem>);
};
export default NotificationMenuItem;
NotificationMenuItem.propTypes = {
  handleNotificationClick: React.PropTypes.func,
  notification: React.PropTypes.object,

};
