import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import getInputValue from './get-input-value';

let component;

const getUserData = () => ({
  email: getInputValue(component.refs.emailAddress),
  password: getInputValue(component.refs.password),
  username: getInputValue(component.refs.username),
  profile: {
    name: {
      first: getInputValue(component.refs.firstName),
      last: getInputValue(component.refs.lastName),
    },
  },
});

const signUp = () => {
  const user = getUserData();

  Accounts.createUser(user, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Welcome!', 'success');
    }
  });
};

const validate = () => {
  $(component.refs.signup).validate({
    rules: {
      firstName: {
        required: true,
      },
      lastName: {
        required: true,
      },
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
      username: {
        required: true,
        minlength: 6,
        maxlength: 20,
      },
    },
    messages: {
      firstName: {
        required: 'First name?',
      },
      lastName: {
        required: 'Last name?',
      },
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?',
      },
      password: {
        required: 'Need a password here.',
        minlength: 'Use at least six characters, please.',
      },
      username: {
        required: 'Need a username here.',
        minlength: 'Use at least six characters, please.',
        maxlength: 'Use at most 20 characters, please.',
      },
    },
    submitHandler() { signUp(); },
  });
};

const handleSignup = (options) => {
  component = options.component;
  validate();
};
export default handleSignup;
