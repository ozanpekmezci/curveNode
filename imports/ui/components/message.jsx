import React from 'react';
import {Row, Col, ListGroupItem} from 'react-bootstrap';
//import {Bert} from 'meteor/themeteorchef:bert';
//import {Link} from 'react-router'
//import {updateProduct, removeProduct} from '../../api/products/methods.js';

const Message = ({message, currentUser}) => (
  <ListGroupItem key={message._id}>

    {currentUser._id === message.receiverId
      ? <Row>
        <Col xs={3} sm={3}>
          <div className="message-received">
              <p>{message.body}</p>
          </div>
        </Col>
        <Col xs={3} sm={3} />
      </Row>
      : <Row><Col xs={3} sm={3} />
        <Col xs={3} sm={3}>
          <div className="message-sent">
              <p>{message.body}</p>
          </div>
        </Col>
      </Row>}

  </ListGroupItem>
);
Message.propTypes = {
  message: React.PropTypes.object,
  currentUser: React.PropTypes.object
};

export default Message;
