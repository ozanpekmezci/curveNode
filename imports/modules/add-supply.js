/* eslint-disable no-undef */
import {Meteor} from 'meteor/meteor';
// import { browserHistory } from 'react-router';
// import { Accounts } from 'meteor/accounts-base';
import {Bert} from 'meteor/themeteorchef:bert';
import {insertSupply} from '../api/supplies/methods.js';
import './validation.js';

let component;

const getSupplyData = () => ({
  body: document.querySelector('[name="body"]').value,
  price: parseInt(document.querySelector('[name="price"]').value, 10),
  productId: component.props.productId,
  timestamp: new Date(),
  userId: Meteor.userId(),
});

const add = () => {
  const supply = getSupplyData();
  insertSupply.call(supply, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      // target.value = '';
      component.toggleForm();
      Bert.alert('Supply added!', 'success');
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
