import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Supplies from '../supplies';


Meteor.publish('supplies', function(productId) {
  check(productId, String);
  return Supplies.find({ productId: productId });
});
