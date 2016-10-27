import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import Messages from './messages';
import rateLimit from '../../modules/rate-limit.js';

const insertMessage = new ValidatedMethod({
  name: 'messages.insert',
  validate: new SimpleSchema({
    senderId: {type: String},
    receiverId: {type: String},
    conversationId: {type: String},
    timestamp: {type: Date},
    body: {type: String}
  }).validator(),
  run(message) {
    if (!this.userId) {
     // Throw errors with a specific error code
     throw new Meteor.Error('Messages.methods.insertMessage.notLoggedIn',
       'Must be logged in to send a message.');
   }

    Messages.insert(message);
  },
});

export default insertMessage;


rateLimit({
  methods: [
    insertMessage,
  ],
  limit: 5,
  timeRange: 1000,
});
