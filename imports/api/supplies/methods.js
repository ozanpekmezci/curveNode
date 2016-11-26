import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import Supplies from './supplies';
import rateLimit from '../../modules/rate-limit.js';

export const insertSupply = new ValidatedMethod({
  name: 'supplies.insert',
  validate: new SimpleSchema({
    body: { type: String, max: 1000 },
    price: { type: Number, min: 1 },
    userId: {type: String},
    productId: {type: String},
    timestamp: {type: Date}
  }).validator(),
  run(supply) {
    return Supplies.insert(supply);
  },
});

export const updateSupply = new ValidatedMethod({
  name: 'supplies.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.body': { type: String, optional: true },
    'update.price': { type: String, optional: true },
  }).validator(),
  run({ _id, update }) {
    if (!this.userId) {
     // Throw errors with a specific error code
     throw new Meteor.Error('Supplies.methods.updateSupply.notLoggedIn',
       'Must be logged in to update supply.');
   }
    const supply = Supplies.findOne(_id);
    if(this.userId !==supply.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Supplies.update(_id, { $set: update });
  },
});

export const removeSupply = new ValidatedMethod({
  name: 'supplies.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    if (!this.userId) {
     // Throw errors with a specific error code
     throw new Meteor.Error('Products.methods.removeSupply.notLoggedIn',
       'Must be logged in to remove supply.');
   }
    const supply = Supplies.findOne(_id);
    if(this.userId !==supply.userId) {
      throw new Meteor.Error('not-authorized', "You are not the the creator of the supply");
    }
    Supplies.remove(_id);
  },
});

rateLimit({
  methods: [
    insertSupply,
    updateSupply,
    removeSupply,
  ],
  limit: 5,
  timeRange: 1000,
});
