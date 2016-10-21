import $ from 'jquery';
import 'jquery-validation';
import {Meteor} from 'meteor/meteor';
// import { browserHistory } from 'react-router';
// import { Accounts } from 'meteor/accounts-base';
import {Bert} from 'meteor/themeteorchef:bert';
import getInputValue from './get-input-value';
import {insertSupply} from '../api/supplies/methods.js';

let component;

const getSupplyData = () => ({
  description: getInputValue(component.refs.description),
  price: parseInt(getInputValue(component.refs.price), 10),
  postId: component.props.postId,
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
  $(component.refs.addSupply).validate({
    rules: {
      description: {
        required: true,
        maxlength: 1000
      },
      price: {
        required: true,
        min: 1
      }
    },
    messages: {
      description: {
        required: 'Description?',
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
