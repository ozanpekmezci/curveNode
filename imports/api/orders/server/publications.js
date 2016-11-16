import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Orders from '../orders';

Meteor.publish('Orders', function(productId) {
  check(productId, String);
  return Orders.find({ productId: productId });
});
