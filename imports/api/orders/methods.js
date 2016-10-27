import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import Orders from './orders';
import rateLimit from '../../modules/rate-limit.js';

export const insertOrder = new ValidatedMethod({
  name: 'orders.insert',
  validate: new SimpleSchema({
    price: { type: Number, min: 1 },
    buyerId: {type: String},
    sellerId: {type: String},
    productId: {type: String},
    supplyId: {type: String},
    timestamp: {type: Date}
  }).validator(),
  run(order) {
    if (!this.userId) {
     // Throw errors with a specific error code
     throw new Meteor.Error('Orders.methods.insertOrder.notLoggedIn',
       'Must be logged in to insert order.');
   }
    if( Orders.findOne({supplyId:order.supplyId,buyerId:order.buyerId})){
      throw new Meteor.Error('Orders.methods.insertOrder.alreadyExists',
        'Already have a running order for that supply');
  }
    return Orders.insert(order);
  },
});

export const updateOrder = new ValidatedMethod({
  name: 'orders.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.price': { type: String, optional: true },
  }).validator(),
  run({ _id, update }) {
    if (!this.userId) {
     // Throw errors with a specific error code
     throw new Meteor.Error('Orders.methods.updateOrder.notLoggedIn',
       'Must be logged in to update order.');
   }
    const order = Orders.findOne(_id);
    if(this.userId !==order.sellerId) {
      throw new Meteor.Error('not-authorized');
    }
    Orders.update(_id, { $set: update });
  },
});

export const removeOrder = new ValidatedMethod({
  name: 'orders.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    if (!this.userId) {
     // Throw errors with a specific error code
     throw new Meteor.Error('Orders.methods.removeOrder.notLoggedIn',
       'Must be logged in to remove order.');
   }
    const order = Orders.findOne(_id);
    if(this.userId !==order.sellerId) {
      throw new Meteor.Error('not-authorized', "You are not the the creator of the order");
    }
    Orders.remove(_id);
  },
});

rateLimit({
  methods: [
    insertOrder,
    updateOrder,
    removeOrder,
  ],
  limit: 5,
  timeRange: 1000,
});
