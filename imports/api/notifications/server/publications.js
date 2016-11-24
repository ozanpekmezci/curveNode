import { Meteor } from 'meteor/meteor';
import { check,Match } from 'meteor/check';
import Notifications from '../notifications';

Meteor.publish('Notifications', function(receiverId) {
  check(receiverId, Match.OneOf( String, null ));
  return Notifications.find({ receiverId: receiverId });
});
