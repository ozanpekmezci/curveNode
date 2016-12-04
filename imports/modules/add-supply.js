/* eslint-disable no-undef */
import {Meteor} from 'meteor/meteor';
// import { browserHistory } from 'react-router';
// import { Accounts } from 'meteor/accounts-base';
import {Bert} from 'meteor/themeteorchef:bert';
import {insertSupply} from '../api/supplies/methods.js';
import './validation.js';
import insertNotification from '../api/notifications/methods.js';

let component;

const getSupplyData = () => ({
  body: document.querySelector('[name="body"]').value,
  price: parseInt(document.querySelector('[name="price"]').value, 10),
  productId: component.props.productId,
  timestamp: new Date(),
  userId: Meteor.userId(),
});
const getNofiticationData = (supplyId) => ({
  timestamp: new Date(),
  actorId: Meteor.userId(),
  receiverId: component.props.productOwner,
  notifiableId:supplyId,
  notifiableType: "Supply",
  url: `/products/${component.props.productId}` ,
});

const add = () => {
  const supply = getSupplyData();
  const supplyId =  insertSupply.call(supply, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      // target.value = '';

      component.toggleForm();
      Bert.alert('Supply added!', 'success');
    }
  });
  const notification = getNofiticationData(supplyId);
  insertNotification.call(notification, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    }
  });
};

const validate = () => {
  $(component.form).validate({
    rules: {
      body: {
        required: true,
        maxlength: 1000
      },
      price: {
        required: true,
        min: 1
      }
    },
    messages: {
      body: {
        required: 'body?',
        maxlength: 'Make it shorter'
      },
      price: {
        required: 'Need a price here.',
        min: 'Price needs to be positive'
      }
    },
    submitHandler() {
      add();
    }
  });
};

const handleAddition = (options) => {
  component = options.component;
  validate();
};
export default handleAddition;
