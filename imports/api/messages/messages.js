import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


const Messages = new Meteor.Collection("Messages");
export default Messages;
Messages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Messages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Messages.schema = new SimpleSchema({
  conversationId: {
    type: String,
    label: "The ID of the conversation that the messages belong to"
  },
  senderId: {
    type: String,
    label: "The ID of the that sends the message"
  },
  receiverId: {
    type: String,
    label: "The ID of the user that receives the message"
  },
  timestamp: {
    type: Date,
    label: 'The date of creation'
  },
  body: {
    type: String,
    label: 'The body of the message'
  },
});

Messages.attachSchema(Messages.schema);

//TODO: add factory, faker etc.
