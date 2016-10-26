import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


const Orders = new Meteor.Collection("Orders");
export default Orders;

Orders.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Orders.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Orders.schema = new SimpleSchema({
  productId: {
    type: String,
    label: "The ID of the product that the oder belongs to"
  },
  supplyId: {
    type: String,
    label: "The ID of the supply that the oder belongs to"
  },
  buyerId: {
    type: String,
    label: "The ID of the user that buys"
  },
  sellerId: {
    type: String,
    label: "The ID of the user that sells"
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
