import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import Notifications from './notifications';
import rateLimit from '../../modules/rate-limit.js';

const insertNotification = new ValidatedMethod({
  name: 'notifications.insert',
  validate: new SimpleSchema({
    actorId: {type: String},
    receiverId: {type: String},
    notifiableId: {type: String},
    notifiableType: {type: String},
    timestamp: {type: Date},
    readAt: {type: Date, optional: true},
    url: {type: String},
  }).validator(),
  run(notification) {
    if (!this.userId) {
     // Throw errors with a specific error code
     throw new Meteor.Error('Notification.methods.insertNotification.notLoggedIn',
       'Must be logged in to trigger a notification.');
   }

    return Notifications.insert(notification);
  },
});

export default insertNotification;


rateLimit({
  methods: [
    insertNotification,
  ],
  limit: 5,
  timeRange: 1000,
});
