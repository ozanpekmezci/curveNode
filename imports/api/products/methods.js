import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import Products from './products';
import rateLimit from '../../modules/rate-limit.js';

export const insertProduct = new ValidatedMethod({
  name: 'products.insert',
  validate: new SimpleSchema({
    title: { type: String, max: 200 },
    body: { type: String, max: 1000 },
    price: { type: Number, min: 1 },
    tags: { type: [String], maxCount: 10 },
    userId: {type: String},
    timestamp: {type: Date}
  }).validator(),
  run(product) {
    return Products.insert(product);
  },
});

export const updateProduct = new ValidatedMethod({
  name: 'products.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.title': { type: String, optional: true },
  }).validator(),
  run({ _id, update }) {
    if (!this.userId) {
     // Throw errors with a specific error code
     throw new Meteor.Error('Products.methods.updateProduct.notLoggedIn',
       'Must be logged in to update product.');
   }
    const product = Products.findOne(_id);
    if(this.userId !==product.userId) {
      throw new Meteor.Error('not-authorized');
    }
    return Products.update(_id, { $set: update });
  },
});

export const removeProduct = new ValidatedMethod({
  name: 'products.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    if (!this.userId) {
     // Throw errors with a specific error code
     throw new Meteor.Error('Products.methods.removeProduct.notLoggedIn',
       'Must be logged in to remove products.');
   }
    const product = Products.findOne(_id);
    if(this.userId !==product.userId) {
      throw new Meteor.Error('not-authorized', "You are not the the creator of the product");
    }
    Products.remove(_id);
  },
});

rateLimit({
  methods: [
    insertProduct,
    updateProduct,
    removeProduct,
  ],
  limit: 5,
  timeRange: 1000,
});
