import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Products } from './products';
import { rateLimit } from '../../modules/rate-limit.js';

export const insertProduct = new ValidatedMethod({
  name: 'products.insert',
  validate: new SimpleSchema({
    title: { type: String, max: 200 },
    description: { type: String, max: 1000 },
    price: { type: Number, min: 1 },
    tags: { type: [String], maxCount: 10 },
  }).validator(),
  run(product) {
    Products.insert(product);
  },
});

export const updateProduct = new ValidatedMethod({
  name: 'products.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.title': { type: String, optional: true },
  }).validator(),
  run({ _id, update }) {
    Products.update(_id, { $set: update });
  },
});

export const removeProduct = new ValidatedMethod({
  name: 'products.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Products.remove(_id);
  },
});

rateLimit({
  methods: [
    insertProduct,
    updateProduct,
    removeProduct,
  ],
  limit: 5,
  timeRange: 1000,
});
