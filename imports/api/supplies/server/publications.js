import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Supplies from '../supplies';


Meteor.publish('supplies', function(postId) {
  check(postId, String);
  return Supplies.find({ postId: postId });
});
