/* eslint-disable no-undef */
import {Meteor} from 'meteor/meteor';
// import { browserHistory } from 'react-router';
// import { Accounts } from 'meteor/accounts-base';
import {Bert} from 'meteor/themeteorchef:bert';
import {insertProduct} from '../api/products/methods.js';
import './validation.js';
import Images from '../api/images/images';


let component;


const getProductData = () => ({
  title: document.querySelector('[name="title"]').value,
  body: document.querySelector('[name="body"]').value.trim(),
  price: parseInt(document.querySelector('[name="price"]').value, 10),
  tags: component.state.tags.map(tag => tag.text),
  picture: component.state.uploadedFile._id,
});



const add = () => {
  const product = getProductData();
  const title = product.title;
  const body = product.body;
  const price = product.price;
  const tags = product.tags;
  const userId = Meteor.userId();
  const picture = product.picture;
  const timestamp= new Date();
  const insertedProductId = insertProduct.call({
    title,
    body,
    price,
    tags,
    userId,
    timestamp,
    picture
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Images.update({ _id: picture}, {$set: {'masterId':insertedProductId }}, function(error) {
       if (error) {
         Bert.alert("Failed... " + error, 'danger');
       }
     })
      // target.value = '';
      component.toggleForm();
      Bert.alert('Product added!', 'success');
    }
  });
};

const validate = () => {
  $(component.addProductForm).validate({
    rules: {
      title: {
        required: true,
        maxlength: 200
      },
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
      title: {
        required: 'Title?',
        maxlength: 'Make it shorter'
      },
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
