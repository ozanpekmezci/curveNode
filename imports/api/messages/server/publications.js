import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Messages from '../messages';

Meteor.publish('Messages', function(conversationId) {
  check(conversationId, String);
  return Messages.find({ conversationId: conversationId });
});
