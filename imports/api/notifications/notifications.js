import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


const Notifications = new Meteor.Collection("Notifications");
export default Notifications;
Notifications.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Notifications.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Notifications.schema = new SimpleSchema({
  notifiableId: {
    type: String,
    label: "The ID of the object that the notifications belong to"
  },
  notifiableType: {
    type: String,
    label: "The type of the object that the notifications belong to"
  },
  actorId: {
    type: String,
    label: "The ID of the user that triggers the notification"
  },
  receiverId: {
    type: String,
    label: "The ID of the user that receives the notification"
  },
  timestamp: {
    type: Date,
    label: 'The date of creation'
  },
  readAt: {
    type: Date,
    label: 'The date the the receiver has read the notification'
  },
  action: {
    type: String,
    label: "The action  that triggers the notification"
  },
});

Notifications.attachSchema(Notifications.schema);

//TODO: add factory, faker etc.
