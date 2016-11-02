import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Messages from '../messages';
import Conversations from '../../conversations/conversations';

Meteor.publish('Messages', function(conversationId) {
  check(conversationId, String);
  return Messages.find({ conversationId: conversationId });
});
Meteor.publishComposite('MessagesofChannel', function(channelId,channelType) {
  check(channelId, String);
  check(channelType, String);
  return {
    find: function() {
      return Conversations.find({ channelId: channelId, channelType:channelType });
    },
    children: [{
      find: function(conversation) {
        return Messages.find({conversationId: conversation._id});
      }
    }]
  }
});
