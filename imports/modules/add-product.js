import $ from 'jquery';
import 'jquery-validation';
// import { browserHistory } from 'react-router';
// import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import getInputValue from './get-input-value';
import { insertProduct } from '../api/products/methods.js';

let component;

const getProductData = () => ({
  title: getInputValue(component.refs.title),
  description: getInputValue(component.refs.description),
  price: parseInt(getInputValue(component.refs.price), 10),
  tags: component.state.tags.map(tag => tag.text),
});

const add = () => {
  const product = getProductData();
  const title = product.title;
  const description = product.description;
  const price = product.price;
  const tags = product.tags;
  insertProduct.call({
    title, description, price, tags,
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      // target.value = '';
      component.toggleForm();
      Bert.alert('Product added!', 'success');
    }
  });
};

const validate = () => {
  $(component.refs.addProduct).validate({
    rules: {
      title: {
        required: true,
        maxlength: 200,
      },
      description: {
        required: true,
        maxlength: 1000,
      },
      price: {
        required: true,
        min: 1,
      },
    },
    messages: {
      title: {
        required: 'Title?',
        maxlength: 'Make it shorter',
      },
      description: {
        required: 'Description?',
        maxlength: 'Make it shorter',
      },
      price: {
        required: 'Need a price here.',
        min: 'Price needs to be positive',
      },
    },
    submitHandler() { add(); },
  });
};

const handleAddition = (options) => {
  component = options.component;
  validate();
};
export default handleAddition;
