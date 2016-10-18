import $ from 'jquery';
import 'jquery-validation';
// import { browserHistory } from 'react-router';
// import { Accounts } from 'meteor/accounts-base';
import {Bert} from 'meteor/themeteorchef:bert';
import getInputValue from './get-input-value';
import {findUser} from '../api/relationships/methods.js';

let component;

const getUserData = () => ({
  searchUser: getInputValue(component.refs.searchUser)
});

const find = () => {
  const username = getUserData().searchUser;
  findUser.call({
    username
  }, (error,result) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.foundUser(result);
    }
  });
};

const validate = () => {
  $(component.refs.findUser).validate({
    rules: {
      searchUser: {
        required: true,
        maxlength: 200
      }
    },
    messages: {
      searchUser: {
        required: 'User to search?',
        maxlength: 'Make it shorter'
      }
    },
    submitHandler() {
      find();
    }
  });
};

const handleFollow = (options) => {
  component = options.component;
  validate();
};
export default handleFollow;
