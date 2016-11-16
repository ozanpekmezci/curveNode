import faker from 'faker'; //TODO: base
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Factory} from 'meteor/dburles:factory';
import {Meteor} from 'meteor/meteor';


const Products = new Mongo.Collection('Products');
export default Products;
if ( Meteor.isServer ) {
  Products._ensureIndex( { title: 1, body: 1 } );
}
Products.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Products.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Products.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the product.'
  },
  body: {
    type: String,
    label: 'The body of the product'
  },
  price: {
    type: Number,
    label: 'The price of the product'
  },
  tags: {
    type: [String],
    label: 'The tags of the product'
  },
  userId: {
    type: String,
    label: 'The userID of the product'
  },
  timestamp: {
    type: Date,
    label: 'The date of creation'
  }
});

Products.attachSchema(Products.schema);

Factory.define('product', Products, {
  title: () => faker.hacker.phrase()
});
