import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


const Conversations = new Meteor.Collection("Conversations");
export default Conversations;
if ( Meteor.isServer ) {
  Conversations._ensureIndex({channelType: 1, channelId: 1,userOne:1, userTwo:1}, {unique: 1});
}
Conversations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Conversations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Conversations.schema = new SimpleSchema({
  channelId: {
    type: String,
    label: "The ID of the channel that the convesation belong to, this can be the order ID or different other things"
  },
  channelType: {
    type: String,
    label: "The type can be 'order' or other things"
  },
  userOne: {
    type: String,
    label: "The ID of the that first sends the message"
  },
  userTwo: {
    type: String,
    label: "The ID of the user that first receives the message"
  },
  timestamp: {
    type: Date,
    label: 'The date of creation'
  },
});

Conversations.attachSchema(Conversations.schema);

//TODO: add factory, faker etc.
