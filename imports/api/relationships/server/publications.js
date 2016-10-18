import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Relationships from '../relationships';



Meteor.publish('users', function(userId) {
  check(userId, String);
  return Meteor.users.find({}, {
    fields: { 'username': 1 },
    limit: 100
  });
});

Meteor.publish('followings', function(userId) {
  check(userId, String);
  return Relationships.find({ follower: userId });
});

Meteor.publish('followers', function(userId) {
  check(userId, String);
  return Relationships.find({ following: userId });
});
