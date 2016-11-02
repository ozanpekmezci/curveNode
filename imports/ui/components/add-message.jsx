import React from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import insertMessage from '../../api/messages/methods.js';

const AddMessage = ({conversation, user}) => {
//stateless
  const handleInsertMessage = (event) => {
    const target = event.target;
    const body = target.value.trim();
    if (body !== '' && event.keyCode === 13) {
      const senderId = user._id;
      const conversationId = conversation._id;
      let receiverId;
      if (conversation.userOne === senderId) {
        receiverId = conversation.userTwo;
      } else if (conversation.userTwo === senderId) {
        receiverId = conversation.userOne;
      }
      insertMessage.call({
        senderId: senderId,
        receiverId: receiverId,
        conversationId: conversationId,
        timestamp: new Date(),
        body: body,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          target.value = '';
          Bert.alert('Message sent!', 'success');
        }
      });
    }
  };
  return (
    <FormGroup>
      <FormControl type="text" onKeyUp={handleInsertMessage} placeholder="Type a message and press enter..." />
    </FormGroup>
  );
};
export default AddMessage
AddMessage.propTypes = {
  conversation: React.PropTypes.object,
  user: React.PropTypes.object
};
