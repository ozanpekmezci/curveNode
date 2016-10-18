import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import Relationships from './relationships';
import rateLimit from '../../modules/rate-limit.js';

export const findUser = new ValidatedMethod({
  name: 'relationships.find',
  validate: new SimpleSchema({
    username: { type: String, max: 200 },
  }).validator(),
  run({username}) {
    if (!this.userId) {
     // Throw errors with a specific error code
     throw new Meteor.Error('Relationships.methods.findUser.notLoggedIn',
       'Must be logged in to find User.');
   }
    const user= Meteor.users.findOne({
      username: username
    }, {
      fields: { 'username': 1 }
    });
    if (!user){
      throw new Meteor.Error('Relationships.methods.findUser.notFound',
        'User does not exist');
    }
    const following =  Relationships.findOne({follower:this.userId, following:user._id});
    const _id= user._id;
    const checkFollowing = typeof following !== 'undefined';
    return {_id, username, checkFollowing };

  },
});

export const followUser = new ValidatedMethod({
  name: 'relationships.follow',
  validate: new SimpleSchema({
    userId: { type: String },
  }).validator(),
  run({ userId }) {
    if (!this.userId) {
     // Throw errors with a specific error code
     throw new Meteor.Error('Relationships.methods.findUser.notFound.notLoggedIn',
       'Must be logged in to update product.');
   }
  if( Relationships.findOne({follower:this.userId, following:userId})){
    throw new Meteor.Error('Products.methods.updateProduct.alreadyExists',
      'Already following the user');
}
   Relationships.insert({
     follower: Meteor.userId(),
     following: userId
   });
  },
});
export const unfollowUser = new ValidatedMethod({
  name: 'relationships.unfollow',
  validate: new SimpleSchema({
    userId: { type: String },
  }).validator(),
  run({ userId }) {
    if (!this.userId) {
     // Throw errors with a specific error code
     throw new Meteor.Error('Relationships.methods.unfollowuser.notLoggedIn',
       'Must be logged in to unfollow user.');
   }

   Relationships.remove({
     follower: this.userId,
     following: userId
   });
  },
});


rateLimit({
  methods: [
    findUser,
    followUser,
  ],
  limit: 5,
  timeRange: 1000,
});
