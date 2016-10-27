import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Conversations from '../conversations';

Meteor.publish('Conversations', function(channelId,channelType) {
  check(channelId, String);
  check(channelType, String);
  return Conversations.find({ channelId: channelId, channelType: channelType});
});
