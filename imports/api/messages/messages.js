import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


const Messages = new Meteor.Collection("Messages");
export default Messages;
if ( Meteor.isServer ) {
  Messages._ensureIndex({orderId: 1, channelId: 1}, {unique: 1});
}
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
  channelId: {
    type: String,
    label: "The ID of the channel that the messages belong to"
  },
  orderId: {
    type: String,
    label: "The ID of the order the the conversation belong to"
  },
  senderId: {
    type: String,
    label: "The ID of the that sends the message"
  },
  recevierId: {
    type: String,
    label: "The ID of the user that receives the message"
  },
  timestamp: {
    type: Date,
    label: 'The date of creation'
  },
  price: {
    type: Number,
    label: 'The price of the order'
  },
});

Orders.attachSchema(Orders.schema);

//TODO: add factory, faker etc.
