import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import Conversations from './conversations';
import rateLimit from '../../modules/rate-limit.js';

const insertConversation = new ValidatedMethod({
  name: 'conversation.insert',
  validate: new SimpleSchema({
    userOne: {type: String},
    userTwo: {type: String},
    channelId: {type: String},
    channelType: {type: String},
    timestamp: {type: Date}
  }).validator(),
  run(conversation) {
    if (!this.userId) {
     // Throw errors with a specific error code
     throw new Meteor.Error('Conversations.methods.insertConversation.notLoggedIn',
       'Must be logged in to start a conversatin.');
   }
   if(Conversations.findOne({channelType:conversation.channelType,channelId:conversation.channelId,userOne:conversation.userOne, userTwo:conversation.userOne})){
     throw new Meteor.Error('Conversations.methods.insertConversation.alreadyExists',
       'Already have a running conversation for that order');
 }
    Conversations.insert(conversation);
  },
});

export default insertConversation;


rateLimit({
  methods: [
    insertConversation,
  ],
  limit: 5,
  timeRange: 1000,
});
