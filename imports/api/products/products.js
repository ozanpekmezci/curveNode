import faker from 'faker';
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Factory} from 'meteor/dburles:factory';

const Products = new Mongo.Collection('Products');
export default Products;
Products.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Products.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Products.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the product.'
  },
  description: {
    type: String,
    label: 'The description of the product'
  },
  price: {
    type: Number,
    label: 'The price of the product'
  },
  tags: {
    type: [String],
    label: 'The tags of the product'
  },
  userId: {
    type: String,
    label: 'The userID of the product'
  }
});

Products.attachSchema(Products.schema);

Factory.define('product', Products, {
  title: () => faker.hacker.phrase()
});
