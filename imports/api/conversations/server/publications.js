import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Orders from '../orders';

Meteor.publish('Orders', function(orderId) {
  check(orderId, String);
  return Orders.find({ _id: orderId });
});
