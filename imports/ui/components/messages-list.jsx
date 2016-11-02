import React from 'react';
import {ListGroup, Alert} from 'react-bootstrap';
import Message from './message.jsx';

const MessagesList = ({messages, user}) => (messages.length > 0
  ? <ListGroup className="products-list">
    {messages.map((message) => (<Message key={message._id} message={message} currentUser={user} />))}
  </ListGroup>
  : <Alert bsStyle="warning">No products yet.</Alert>);
export default MessagesList;
MessagesList.propTypes = {
  messages: React.PropTypes.array,
  user: React.PropTypes.object
};
