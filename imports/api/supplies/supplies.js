import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


const Supplies = new Meteor.Collection("Supplies");
export default Supplies;

Supplies.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Supplies.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Supplies.schema = new SimpleSchema({
  productId: {
    type: String,
    label: "The ID of the product that the supply was sent to"
  },
  userId: {
    type: String,
    label: "The ID of the user that sent this supply"
  },
  timestamp: {
    type: Date,
    label: 'The date of creation'
  },
  description: {
    type: String,
    label: 'The description of the supply'
  },
  price: {
    type: Number,
    label: 'The price of the supply'
  },
});

Supplies.attachSchema(Supplies.schema);

//TODO: add factory, faker etc.
