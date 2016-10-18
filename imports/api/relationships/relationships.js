import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


const Relationships = new Meteor.Collection("relationships");
export default Relationships;
if ( Meteor.isServer ) {
  Relationships._ensureIndex({follower: 1, following: 1}, {unique: 1});
}

Relationships.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Relationships.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Relationships.schema = new SimpleSchema({
  follower: {
    type: String,
    label: "The follower's ID"
  },
  following: {
    type: String,
    label: "The following's ID"
  },
});

Relationships.attachSchema(Relationships.schema);

//TODO: add factory, faker etc.
