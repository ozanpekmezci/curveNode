import { Meteor } from 'meteor/meteor';
import { Products } from '../products';

Meteor.publish('products', () => Products.find());
